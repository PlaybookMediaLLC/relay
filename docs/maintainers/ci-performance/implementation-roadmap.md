# Implementation roadmap

Ranked by measured impact on the critical path from code change to safe
deployment. Baseline numbers: [baseline.md](baseline.md). Everything in
Phase 1 is implemented on `perf/ci-pipeline-redesign`.

## Phase 1 — done

### P1-1. Replace the deploy's duplicate checks with a real gate

- **Bottleneck.** `deploy-playbook.yml`'s `checks` job was 4.2 min of the
  6.2 min from push to production, running a subset of what `CI / ci` was
  running concurrently on the same commit. The deploy job started while the
  browser and Postgres suites for that commit were still running, so a red E2E
  run could not stop it.
- **Files.** `.github/workflows/deploy-playbook.yml`
- **Change.** A `gate` job polls `GET /commits/{sha}/check-runs` every 15 s and
  requires `ci`, `e2e-core`, `e2e-growth` and `postgres` to be green for that
  exact SHA. 25-minute ceiling, fails closed on anything unknown.
- **Mechanism.** Removes ~250 s of duplicated compute and replaces a weaker
  gate with a stronger one.
- **Impact.** Push to production: 6.2 min → the slowest required check plus
  ~1.8 min of deploy. Gate coverage goes from one partial job to four complete
  workflows.
- **Cost.** None; the gate mostly sleeps, on free runners.
- **Confidence.** High. The polling logic was run against real commits: it
  passes on `750172ed` and blocks `304151c8` (`ci(cancelled) e2e-core(failure)
e2e-growth(failure)`) and `b2131aa4` (`ci(failure)`).
- **Effort.** Half a day.
- **Risks.** A check renamed without updating `REQUIRED` makes the gate wait
  25 minutes and then fail. The `deploy_without_checks` dispatch input could be
  used habitually; it logs a warning and writes to the run summary.
- **Verification.** Merge to `main` and confirm the deploy waits, then
  confirm a deliberately failing branch is blocked.
- **Rollback.** Revert the file; the previous `checks` job is self-contained.

### P1-2. Run CI in parallel behind a summary job

- **Bottleneck.** `CI / ci` was one serial job, 5.7 min P50, in which the first
  actionable failure arrived at 3.6 min P50.
- **Files.** `.github/workflows/ci.yml`
- **Change.** Six jobs that start together — `static`, `unit`, `build`,
  `website`, `docker-build`, `standalone-image` — plus a `changes` job and a
  summary job that keeps the id `ci`.
- **Impact measured on the first full run:** `static` 1m51s, `unit` 2m52s,
  `build` 1m22s, `website` 1m16s, summary 4 s. Workflow wall 5.7 min → under
  3 min.
- **Cost.** About 1.5 extra runner-minutes per push, in installs. Free here.
- **Confidence.** High — measured.
- **Effort.** One day.
- **Risks.** **The summary job id must stay `ci`.** Branch protection on `main`
  requires that context and the deploy gate waits for it; renaming it blocks
  every merge silently. Splitting also exposed a real coupling — see P1-5.
- **Rollback.** Revert the file.

### P1-3. Select the build jobs by what changed

- **Bottleneck.** `docker-build` (2.6 min) and `standalone-image` (3.0 min) ran
  on every pull request: 376 runner-minutes over 11 days and two of the eight
  queue slots a push takes. The self-host image does not compile the
  application at all, and the standalone image recompiles what the `build` job
  built 26 s earlier.
- **Files.** `scripts/ci-affected.mjs`, `scripts/ci-affected.test.ts`,
  `.github/workflows/ci.yml`
- **Change.** A documented, tested rule set maps changed paths to four flags
  and prints a table saying why each job ran or was skipped. The static checks
  and the unit suite are not selectable; an unmapped path turns everything on;
  a push to `main` is never narrowed.
- **Impact.** Up to 5.6 min of runner time and two queue slots off a typical
  pull request.
- **Confidence.** High for the mechanism; the rules themselves are a judgement
  call and are reviewed as such.
- **Effort.** One day.
- **Risks.** A rule that is too narrow skips a check that mattered. Mitigated
  by the conservative fallback, the unit test, and the audit table.
- **Rollback.** Delete the `if:` lines; the jobs run unconditionally again.

### P1-4. Cache Chromium and the migrated local D1 state

- **Bottleneck.** `Install Chromium` had a 21 s median, a 522 s P95 on growth
  and six outright failures; `db:migrate:local` replayed 111 migrations for
  39 s on every browser job.
- **Files.** `.github/workflows/e2e-core-playbook.yml`,
  `.github/workflows/e2e-growth-playbook.yml`
- **Change.** `~/.cache/ms-playwright` keyed on the exact Playwright version;
  `.wrangler/state/v3/d1` keyed on `drizzle/sqlite/**`, `wrangler.jsonc` and
  the lockfile, saved with `actions/cache/save` **immediately after the
  migration** so the specs' own writes never enter the cache.
- **Impact measured, and smaller than intended.** The migration step (−40 s)
  disappears on a hit, but the specs get 17–25 s slower, so the net is about
  15–25 s per job. Two causes, both documented in
  [benchmark-results.md](benchmark-results.md): the migration leaves a 5.8 MB
  write-ahead log (fixed by `scripts/ci-checkpoint-d1.mjs`), and running it
  also warmed the module cache the Vite dev server needs thirty seconds later.
  The Chromium cache takes the install from 21 s to 11–17 s but does **not**
  remove its tail — one hit still stalled for over eight minutes inside `apt`,
  which is now bounded by `timeout 300` and one retry. See P2-10.
- **Confidence.** High — every effect measured, including the two that went
  the wrong way.
- **Effort.** Half a day.
- **Risks.** A cache of mutable state would change what a run sees — which is
  why the save point matters and is commented in both workflows.
- **Rollback.** Delete the cache steps and the `if:` on the migration.

### P1-5. Install root dependencies in the website job

- **Bottleneck.** Not performance. Splitting the monolithic job revealed that
  `web/tsconfig.json` type-checks a spec importing the root-only
  `@playwright/test`, which had only ever passed because the root install ran
  first in the same job.
- **Files.** `.github/workflows/ci.yml`
- **Change.** The website job installs both workspaces, with a pointer to the
  2026-10-06 `.agents/PAPERCUTS.md` entry proposing the real fix.
- **Effort.** Minutes.

### P1-6. Discover the Postgres suites and shard them

- **Bottleneck.** A hand-written list of nine paths had fallen 21 suites
  behind, so 21 real-SQL files — including every billing spend suite — had
  never run against Postgres. The single job was also strictly serial.
- **Files.** `scripts/ci-postgres-suites.mjs`,
  `.github/workflows/postgres-tests-playbook.yml`
- **Change.** Walk the import closure from the one module that chooses
  Postgres over SQLite (57 suites, fails below 30), and run them as three
  shards with one Postgres container each. `--no-file-parallelism` stays
  **within** a shard, so the documented shared-row race is preserved.
- **Impact measured.** 2.2 min P50 for 36 suites → 1m09s / 1m17s / 1m16s in
  parallel for 57, of which 21–30 s is the test work.
- **Confidence.** High — measured, and all three shards passed.
- **Effort.** One day.
- **Risks.** The `postgres` summary job id must stay `postgres` for the same
  reason as `ci`. Newly-covered suites may reveal genuine Postgres bugs; that
  is the point, but it may need fixing before this merges.
- **Rollback.** Revert the file; the old list is in git history.

## Phase 2 — architectural, not done

| #     | Change                                                                             | Expected impact                                                                                                                      | Effort | Risk       | Confidence                                                                                    |
| ----- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------- | --------------------------------------------------------------------------------------------- |
| P2-1  | Run the MCP tenant-isolation browser suite in CI                                   | Closes a hard-invariant coverage gap                                                                                                 | 1 d    | Low        | Needs a cost measurement first                                                                |
| P2-2  | Required status checks on `develop`                                                | A red pull request can no longer merge                                                                                               | 10 min | Low        | Repository setting; needs the maintainer                                                      |
| P2-3  | Add `e2e-core` and `postgres` to the `main` ruleset                                | Branch protection matches the deploy gate                                                                                            | 10 min | Low        | Same                                                                                          |
| P2-4  | Two Playwright workers for the core suite's viewport block                         | −27 s on `e2e-core`                                                                                                                  | 1 d    | **Medium** | Must pass `--repeat-each=10` locally and ten CI runs first                                    |
| P2-5  | Cache `node_modules/.vite` for the browser jobs                                    | Some of the 33.8 s dev-server boot                                                                                                   | 0.5 d  | Low        | Unmeasured                                                                                    |
| P2-6  | `tsc --incremental` with a cached `.tsbuildinfo`                                   | Some of the 31 s type check                                                                                                          | 1 d    | **Medium** | A stale buildinfo that checks less is worse than a slow check                                 |
| P2-7  | Write down expand-and-contract, and check for destructive statements in migrations | Makes rollback-after-migration safe by rule, not by habit                                                                            | 2 d    | Low        | Correctness, not performance                                                                  |
| P2-8  | Fix or demote the security scan                                                    | Removes a check that is red on ~40% of pull requests                                                                                 | 1–3 d  | Low        | Needs its own investigation                                                                   |
| P2-9  | Decide whether `release.yml` should run on Relay pull requests                     | −1.3 min and one queue slot per pull request                                                                                         | 0.5 d  | Low        | A product decision: does this fork support `everyapp install`?                                |
| P2-10 | Run the browser jobs in `mcr.microsoft.com/playwright:v<version>-noble`            | Removes the `apt` step `--with-deps` shells out to, which is the real source of the 522 s P95 and of a stall observed on a cache hit | 1 d    | Low        | Trades a 21 s median plus an unbounded tail for a steadier image pull; measure the pull first |

### P2-2 and P2-3 in detail

These are the cheapest remaining safety improvements and they are settings
changes this work deliberately did not make.

`develop` requires a pull request with **zero** required status checks, so a
red pull request can merge. Recommended minimum: `ci`, `e2e-core`,
`e2e-growth`, `postgres`.

`main` requires `ci` and `e2e-growth` only. The deploy gate now requires four
checks; branch protection should require the same four, so a merge cannot
create a commit the gate will refuse to deploy.

Both need `strict_required_status_checks_policy` considered too. It is `false`
today, and the merge method is a merge commit, so the SHA that lands on `main`
is one no check ran on before the merge. The push-triggered run plus the gate
covers it, but turning strict on would catch semantic conflicts before the
merge rather than after.

## Phase 3 — experiments

| #    | Experiment                                        | What would justify adopting it                                                                                                                                                                   |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P3-1 | Stagehand for exploratory testing                 | One equivalent journey run 20 times each way, comparing wall time, cost per run and failure rate. Never as a merge gate — see [playwright-optimization.md](playwright-optimization.md#stagehand) |
| P3-2 | Vitest without isolation, one directory at a time | `--no-isolate` is 20.1 s against 66.8 s, but fails 125 files today. Profile where the 76% import cost concentrates before touching anything                                                      |
| P3-3 | Larger or self-hosted runners                     | Only if wall time, not duplication, becomes the binding constraint. Runners are free on this public repository; paying for them needs a stronger case than it has now                            |
| P3-4 | Preview deployments for this fork                 | Design below                                                                                                                                                                                     |
| P3-5 | Historical per-test duration tracking             | Would turn "this got slower" from a hunch into a number. Cheap if it is a JSON artifact per run; not worth a service                                                                             |

### P3-4. Preview deployments

`pr-preview.yml` is inherited and inert: it is gated to `bensenescu/open-seo`
and `every-app/private-open-seo`, and it ran 397 times in 11 days without
doing anything. That gate is **deliberate and should not simply be widened to
include this fork.**

The workflow deploys a real Cloudflare stage using `CLOUDFLARE_API_TOKEN` and
`ENV_PREVIEW`. Enabling it for Relay means a pull-request-triggered workflow
holding deployment credentials. Before that is safe:

- Restrict it to pull requests from branches in this repository, never forks
  (upstream's version already does this).
- Keep the Cloudflare Access verification step, which fails the job if the
  preview answers without a login challenge.
- Keep per-pull-request stages and the close-triggered teardown, so a stage
  cannot outlive its pull request.
- Set a spend ceiling and an alarm on the account.
- Confirm `ENV_PREVIEW` sets `AUTH_MODE` explicitly — the 2026-09-30
  `.agents/PAPERCUTS.md` entry describes the failure when it does not.

That is a week of careful work for a convenience feature, and it is the lowest
item on this list.
