# Builds and caches

What each build costs, what is cached, and which builds a pull request
actually needs.

## Dependency installation

`pnpm install --frozen-lockfile` is 17 s at P50 and 24 s at P95 on a runner,
with `setup-node`'s `cache: pnpm` restoring the store. That is cheap enough
that splitting the old monolithic job into parallel jobs — each paying its own
install — costs less wall time than it saves.

One wart: six jobs on the same push race to save the same store cache, so five
end with

```
Failed to save: Unable to reserve cache with key node-cache-Linux-x64-pnpm-<hash>, another job may be creating this cache.
```

This is harmless — the one that wins writes the entry the others would have
written — but it is noise in every log. Designating one job as the writer would
remove it, at the cost of a conditional nobody would remember. Left alone.

## Static checks

`pnpm ci:check` is 91 s at P50 on a runner. Component costs, on a 10-core
developer machine with warm dependencies:

| Command                                        |   Cold | Cached |
| ---------------------------------------------- | -----: | -----: |
| `prettier --check .`                           | 13.1 s |  1.8 s |
| `tsc --noEmit`                                 | 31.0 s |      — |
| `oxlint . --type-aware`                        |  9.6 s |      — |
| `knip`                                         |  6.8 s |      — |
| `tsc --noEmit -p tests/badseo/tsconfig.json`   |  2.2 s |      — |
| `tsc --noEmit -p tsconfig.report-widgets.json` |  0.7 s |      — |
| `pnpm sync-plugin-skills`                      |  0.6 s |      — |

**Change made:** `format:check` and `ci:check` pass `--cache
--cache-strategy content`, and the `static` job restores
`node_modules/.cache/prettier`.

Prettier's cache keys on file content and on the resolved options, and it is
invalidated by a Prettier version change, so a restored entry can only turn a
check that would have passed into a faster pass. `content` rather than the
default `metadata` matters in CI specifically: a fresh checkout gives every
file a new mtime, so the metadata strategy would miss on everything.

**Not changed:** `tsc --noEmit` is the largest single cost and runs three
times across three projects. TypeScript's `--incremental` with a cached
`.tsbuildinfo` is the obvious lever, but a stale or partially-matching
`.tsbuildinfo` can make `tsc` skip work it should do, and a type check that
silently checks less is worse than a slow one. [P2-6](implementation-roadmap.md)
is to measure it behind a key that includes the compiler version and every
`tsconfig`.

`oxlint --type-aware` runs tsgolint, which does its own type analysis, so some
work overlaps with `tsc --noEmit`. Removing the overlap means trusting one of
them to cover the other's diagnostics; not worth it for ~10 s.

## The unit suite

448 files, 3,378 tests, 66.8 s on a 10-core machine, 105 s on a 4-core runner.
Vitest's own breakdown:

```
Duration  66.75s (import 76%, tests 17%, transform 5%, worker 1%)
Isolate   448 workers spawned · ~268ms startup each
```

Three-quarters is module loading, repeated once per file because every file
gets a fresh worker. `--no-isolate` reuses workers and finishes in **20.1 s**,
but fails 125 files: the suites rely on per-file module state, which
`vi.mock` hoisting and module-scope singletons make load-bearing.

That 46-second gap is the biggest single opportunity left in the pipeline, and
it is not reachable by a flag. Options, in order of how much they ask of the
codebase:

1. Find the few heavy modules the import cost concentrates in and make the
   suites that touch them stop importing the world. Needs a profile first.
2. Run the suite in two shards on two runners. Halves wall time, costs an
   extra install, and is available today if 105 s ever becomes the critical
   path. It is not: the `unit` job now runs beside `static`, `build` and the
   browser suites rather than in front of them.
3. Convert files to work without isolation, one directory at a time. Large,
   and the failure mode of getting it wrong is tests that pass for the wrong
   reason.

None is done here. The job's position in the graph changed instead, which
bought more wall time than any of them would have.

## Cloudflare Worker build

`pnpm vite build` is 24 s at P50 on a runner. Its purpose in CI is not the
artifact — which is thrown away — but the `leanWorkerBundle` plugin's
`generateBundle` assertion, which fails the build if a denylisted package
re-enters the worker's eager startup graph. The denylist exists because the
isolate's 128 MB limit is shared by everything evaluated at startup, and
production OOM bursts traced back to baseline heap rather than leaks.

That guard is preserved exactly. It moved from the serial `ci` job into the
parallel `build` job and is otherwise untouched.

Two details in `vite.config.ts` worth not breaking while optimising:

- `output.charset: "ascii"` escapes non-ASCII characters so V8 stores module
  source at one byte per character instead of two. It took the main worker
  chunk from 15.5 MB of heap to 7.8 MB.
- `vite-plugin-lean-worker-bundle.ts` escapes comment text in the worker chunks
  after that pass, because one surviving non-Latin-1 character loses the whole
  saving.

Neither is a build-time cost worth touching.

## Report widgets

`vite.report-widgets.config.ts` builds a single IIFE bundle
(`src/report-widgets/rank-grid.ts` plus Leaflet) into
`src/public/report-widgets/v1.js`, which is gitignored. It is a prerequisite
of `build:standalone`, `build`, `dev` and the deploy, so it runs more than
once per push — but it is a few seconds of a lib build and is not worth
caching across jobs.

## Standalone build

`pnpm build:standalone` is 26 s at P50: report widgets, then
`vite build --mode standalone` (which inlines dynamic imports into a single
module for celld), then `scripts/celld/package.mjs`. `pnpm
test:standalone:gateway` follows it. Both stay in the `build` job.

## Docker images

| Image      | Dockerfile                     |     P50 | What it actually proves                                                         |
| ---------- | ------------------------------ | ------: | ------------------------------------------------------------------------------- |
| Self-host  | `deploy/docker/Dockerfile`     | 2.6 min | That the recipe builds and `pnpm install` works on Linux                        |
| Standalone | `deploy/standalone/Dockerfile` | 3.0 min | The above, plus `pnpm build:standalone` inside the image and the celld download |

The self-host image **never compiles the application**. It copies the source,
installs dependencies, and builds at container start from
`deploy/docker/docker-entrypoint.sh`. So on a pull request that changes
`src/`, its 2.6 minutes tell you nothing that was not already known.

The standalone image does compile the application — but `pnpm build:standalone`
already ran natively in the `build` job 26 seconds earlier. What the image adds
over that is the recipe, the celld binary download and checksum, and the
runtime stage's file layout.

**Change made:** both are selected by path
(`scripts/ci-affected.mjs` → `docker`, `standalone_image`) rather than run
unconditionally, and both always run on a push to `main`. The selection is
deliberately wide: the whole dependency set (`package.json`, `pnpm-lock.yaml`,
`pnpm-workspace.yaml`, `patches/`, `.npmrc`, `.nvmrc`) selects both, because
that is what those images install.

Over the measured window these two jobs were 376 runner-minutes, about 20% of
all CI time, and two of the eight queue slots every pull request takes.

**Not changed:** `cache-from`/`cache-to: type=gha` stays. A longer-lived remote
cache (a registry cache, or `type=gha,mode=max` with a dedicated scope per
branch) would help a cold build, but with these jobs now running on a minority
of pull requests the remaining spend does not justify new infrastructure.

## Website build

`web/` is a separate pnpm workspace with its own lockfile and its own
dependency versions. From the product it imports only `src/shared/`
(`AGENTS.md`, "Boundaries"), plus Markdown under `content/`.

**Change made:** the website checks and build moved into their own job,
selected when `web/`, `content/` or `src/shared/` changes. A change confined to
`src/server/` no longer rebuilds the website.

Splitting it surfaced a real coupling: `web/tsconfig.json` includes `**/*.ts`,
so it type-checks `web/tests/free-tool-verification.spec.ts`, which imports the
root-only `@playwright/test`. In the old monolithic job the root install had
already run, so this passed by accident. The website job now installs both
workspaces, with a comment pointing at the 2026-10-06 entry in
`.agents/PAPERCUTS.md` that proposes the real fix.

`pnpm --dir web run test:protection` — the free-tool abuse and spend
protection suite — stays in that job and still runs whenever the website does.

`deploy-website.yml` remains gated to upstream repositories and is untouched.
Relay does not deploy a separate marketing site.

## Cache safety

Every cache in this pipeline is derived from files in the commit:

| Cache         | Key                                               | Written by                     | Read by    |
| ------------- | ------------------------------------------------- | ------------------------------ | ---------- |
| pnpm store    | lockfile hash                                     | any job                        | any job    |
| Prettier      | lockfile + SHA, prefix restore                    | `static`                       | `static`   |
| Chromium      | exact Playwright version                          | E2E jobs                       | E2E jobs   |
| Local D1      | `drizzle/sqlite/**` + `wrangler.jsonc` + lockfile | E2E jobs, after migration only | E2E jobs   |
| Docker buildx | layer digests                                     | image jobs                     | image jobs |

None is written by a deployment context and read by a pull-request context, or
the reverse. The deploy builds its own artifact for exactly this reason — see
[target-architecture.md](target-architecture.md#why-the-deploy-still-builds-its-own-artifact).
