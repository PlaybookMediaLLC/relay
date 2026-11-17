# Baseline

552 workflow runs, 2026-10-26 to 2026-11-06. Collection method and
reproduction commands: [README.md](README.md).

## What a pull request costs today

56 pull-request commits in the window received the complete fan-out (six
workflows) and finished without a cancellation. Across those:

| Measure                                 |     P50 |      P90 |      P95 |      Max |   n |
| --------------------------------------- | ------: | -------: | -------: | -------: | --: |
| Wall-clock, push to last check finished | 6.3 min | 13.5 min | 13.9 min | 15.7 min |  56 |
| Runner-minutes per commit               |    25.1 |        — |     35.6 |     42.1 |  56 |
| Time to the first failing job           | 3.6 min |        — |  7.4 min |        — |  24 |

Two things stand out. The P95 is more than twice the P50, and the first signal
that something is broken arrives at 3.6 min — after which a developer has
usually moved on to something else.

## Per-job durations

Successful jobs only. `sum` is total runner-minutes over the 11 days.

| Workflow / job                     |   n | P50 |  P95 |  Max | sum (min) |
| ---------------------------------- | --: | --: | ---: | ---: | --------: |
| CI / ci                            |  64 | 5.7 |  6.5 |  6.7 |       346 |
| E2E core flows / e2e-core          |  67 | 3.8 | 13.1 | 16.7 |       300 |
| E2E growth workflow / e2e-growth   |  69 | 3.3 | 13.3 | 16.4 |       294 |
| CI / standalone-image              |  71 | 3.0 |  4.1 |  5.3 |       205 |
| CI / docker-build                  |  72 | 2.6 |  3.5 |  3.9 |       171 |
| Postgres real-SQL tests / postgres |  73 | 2.2 |  2.4 |  2.5 |       156 |
| Security / static                  |  34 | 3.7 |  4.1 |  4.3 |       122 |
| Security / static (failures)       |  26 | 3.4 |  4.2 | 11.1 |        95 |
| Release / everyapp release         |  65 | 1.3 |  1.6 |  2.5 |        85 |
| Deploy (Playbook) / checks         |  10 | 4.2 |  4.4 |  4.4 |        39 |
| Deploy (Playbook) / deploy         |  10 | 1.8 |  2.0 |  2.1 |        18 |

**Total non-skipped job time in the window: 1,926 minutes**, about 175 minutes
of runner time per day.

## Queue time

| Workflow                |   n | Queue P50 | Queue P95 | Wall P50 | Wall P95 |
| ----------------------- | --: | --------: | --------: | -------: | -------: |
| CI                      |  77 |       4 s |     205 s |  5.8 min | 12.2 min |
| E2E core flows          |  76 |       4 s |     235 s |  3.9 min | 12.6 min |
| E2E growth workflow     |  77 |       4 s |     152 s |  3.4 min | 13.0 min |
| Postgres real-SQL tests |  76 |       4 s |     234 s |  2.3 min |  6.1 min |
| Security                |  66 |       4 s |     214 s |  3.7 min |  7.6 min |
| Release                 |  65 |       4 s |     318 s |  1.5 min |  6.4 min |
| Deploy (Playbook)       |  10 |       3 s |      29 s |  6.2 min |  7.6 min |

A median push waits four seconds for a runner. A P95 push waits two and a half
to five minutes. One push starts eight jobs (CI's three, plus core, growth,
Postgres, Security and Release), so three concurrent pull requests exceed the
free tier's 20-job ceiling and everything after that queues. **Most of the gap
between the 6.3-minute P50 and the 13.9-minute P95 is contention we create
ourselves**, not slower work.

## Where the CI job's 5.7 minutes go

Step P50 and P95, in seconds, from the `CI / ci` job. The job is strictly
serial, so these add up.

| Step                                      | P50 | P95 |
| ----------------------------------------- | --: | --: |
| Run tests (`vitest run`)                  | 105 | 135 |
| Run CI checks (`pnpm ci:check`)           |  91 | 115 |
| Build standalone server                   |  26 |  30 |
| Build website                             |  26 |  29 |
| Build worker (eager-bundle guard)         |  24 |  29 |
| Install dependencies                      |  17 |  24 |
| Setup Node.js                             |  10 |  17 |
| Run website type checks                   |   8 |   9 |
| Install website dependencies              |   4 |   5 |
| Test free-tool abuse and spend protection |   2 |   3 |
| Checkout                                  |   2 |   6 |

`ci:check` itself, measured on a 10-core developer machine with warm
dependencies:

| Command                                        |                              Duration |
| ---------------------------------------------- | ------------------------------------: |
| `prettier --check .`                           | 13.1 s cold, 1.8 s with its own cache |
| `tsc --noEmit`                                 |                                31.0 s |
| `oxlint . --type-aware`                        |                                 9.6 s |
| `knip`                                         |                                 6.8 s |
| `tsc --noEmit -p tests/badseo/tsconfig.json`   |                                 2.2 s |
| `tsc --noEmit -p tsconfig.report-widgets.json` |                                 0.7 s |
| `pnpm sync-plugin-skills`                      |                                 0.6 s |

## Where the unit suite's time goes

`vitest run` on the same machine: **448 files, 3,378 tests, 66.8 s**. Vitest's
own accounting:

```
Duration  66.75s (import 76%, tests 17%, transform 5%, worker 1%)
Isolate   448 workers spawned · ~268ms startup each (spawn + environment, per file)
          at least ~13.10s faster with isolate: false
```

The sum of per-file wall times is **63 s**, of which the slowest five files are:

| File                                                                | Duration | Tests |
| ------------------------------------------------------------------- | -------: | ----: |
| `src/server/features/split-tests/splitStats.test.ts`                |   12.4 s |     9 |
| `src/server/lib/string-retention.test.ts`                           |    6.2 s |     2 |
| `src/server/features/revenue/revenueSync.test.ts`                   |    2.7 s |     2 |
| `src/server/workflows/site-audit-workflow-helpers.test.ts`          |    2.6 s |     7 |
| `src/server/features/audit/services/AuditService.rendering.test.ts` |    2.5 s |     5 |

Three-quarters of the wall time is module loading, repeated once per file
because each file gets a fresh worker. Running with `--no-isolate` takes
**20.1 s instead of 66.8 s** — and fails 125 files, because the suites rely on
per-file module state. That number is the size of the prize, not a usable
setting.

## Where the browser suites' time goes

| Step                          | core P50 | core P95 | growth P50 | growth P95 |
| ----------------------------- | -------: | -------: | ---------: | ---------: |
| Run the spec                  |    126 s |    139 s |       99 s |      114 s |
| Migrate the local D1 database |     39 s |     42 s |       39 s |       43 s |
| Install Chromium              |     21 s |    134 s |       21 s |  **522 s** |
| Install dependencies          |     17 s |     22 s |       17 s |       21 s |
| Setup Node.js                 |      9 s |     18 s |        8 s |       16 s |

Inside the core spec (run `41929235693`): the step began at 22:56:00.8 and the
first test started at 22:56:34.6, so **33.8 s is the Vite dev server booting**.
The five tests then take 33.7 + 27.5 + 8.5 + 8.2 + 15.3 = 93.2 s, and the two
longest are the same page tour run at two viewport widths.

`pnpm db:migrate:local` applies **111 SQLite migrations** one at a time through
wrangler: 25.4 s on a developer machine, 39 s on a runner.

## Flakiness

Failing steps across the window:

| Step                                   | Failures |
| -------------------------------------- | -------: |
| Security / `Scan repository`           |       23 |
| Security / `Publish redacted registry` |        6 |
| E2E growth / `Install Chromium`        |        3 |
| E2E core / `Install Chromium`          |        3 |
| CI / `Run CI checks`                   |        3 |

Two separate problems:

1. **The security scan is red on about 40% of pull requests** (26 failing
   `static` jobs out of 60). It is not a required check, so it has become
   permanent noise that trains people to ignore a red check.
2. **Nothing caches the Chromium download.** It fails outright six times, and
   its P95 on the growth job is 522 s against a 21 s median — which is most of
   the gap between that job's 3.4-minute P50 and 13.0-minute P95.

Every E2E job also ends with `Failed to save: Unable to reserve cache with key
node-cache-Linux-x64-pnpm-...`: six jobs race to save the same pnpm store
cache and five lose. Harmless, but it is noise in every log.

## Duplicated work

| Work                                         | Where it runs                                        |   Cost per push to main |
| -------------------------------------------- | ---------------------------------------------------- | ----------------------: |
| `tsc --noEmit`, `oxlint`, `knip`, `prettier` | `ci.yml` **and** `deploy-playbook.yml`               |             ~90 s twice |
| `vitest run`                                 | `ci.yml` **and** `deploy-playbook.yml`               |            ~105 s twice |
| `pnpm install`                               | 8 jobs per push                                      |              ~17 s each |
| `pnpm build:standalone`                      | `CI / ci` natively **and** inside `standalone-image` | ~26 s + the image build |

The deploy's `checks` job is 4.2 min of the 6.2 min from push to production,
and it is a strict subset of what `CI / ci` is running concurrently on the same
commit.

## Deployment gating

**A production deploy is not gated on the browser or Postgres suites, and does
not wait for CI.** All five workflows fire independently from the same push.
Measured job windows, relative to the first job start of that push:

Push `edf3f0fa`:

```
    2s ->  176s   Deploy (Playbook) / checks
   91s ->  219s   Postgres / postgres
   94s ->  299s   CI / standalone-image
  114s ->  313s   E2E growth / e2e-growth
  137s ->  276s   CI / docker-build
  178s ->  472s   CI / ci
  272s ->  444s   E2E core / e2e-core
  371s ->  489s   Deploy (Playbook) / deploy      <-- deploys here
```

The deploy job started at t+371s. `CI / ci` finished at t+472s and `e2e-core`
at t+444s. Had either failed, production would already have been updated.

Branch protection does not close this either. The `main` ruleset requires only
two contexts, `ci` and `e2e-growth`; `e2e-core`, `postgres`, `security`, and
both image builds are not required. `strict_required_status_checks_policy` is
`false` and the merge method is a merge commit, so the SHA that lands on `main`
— and that gets deployed — is a commit no check ever ran on before the merge.

The `develop` ruleset, which is where day-to-day work lands, requires a pull
request with **zero** required status checks and zero approvals.

## Coverage gaps

**Postgres.** `postgres-tests-playbook.yml` lists nine paths by hand. Walking
the import graph from `opportunityRepositoryTestDb.ts` — the one module that
chooses Postgres over in-memory SQLite — finds **57** real-SQL test files. The
hand-written list covers 36. The 21 it misses include every billing spend
suite:

```
src/server/billing/aiSpend.test.ts
src/server/billing/spendAdmission.test.ts
src/server/billing/spendReconcile.test.ts
src/server/features/spend/SpendLimitService.test.ts
src/server/features/accessibility/{AccessibilityCheckService,accessibilityStep}.test.ts
src/server/features/activity/{auditEvents,auditPublishing}.test.ts
src/server/features/conversion/{ConversionDetectionService,ConversionGateService,CopyDraftService}.test.ts
src/server/features/docs/docsIndex.test.ts
src/server/features/performance/{PerformanceLabService,PerformanceResultService,fieldData,performanceSignals}.test.ts
src/server/features/revenue/{RevenueConnectionService,revenueSync}.test.ts
src/server/features/support/supportSync.test.ts
src/server/features/work/workData.test.ts
src/server/lib/audit/rendering-billing.test.ts
```

This was already logged in `.agents/PAPERCUTS.md` on 2026-10-28.

**Browser suites that exist but never run in CI.** No workflow references:

| Config or spec                                                                                            | What it covers                                    |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `tests/playwright.mcp-isolation.config.ts` → `mcp-tenant-isolation.spec.ts`                               | MCP tenant isolation, 416 lines                   |
| `tests/playwright.free-tools.config.ts` → `web/tests/*.spec.ts`                                           | Free-tool abuse and spend protection in a browser |
| `tests/playwright.config.ts` → `app-navigation`, `domain-overview-filters`, `keyword-research-navigation` | Fixture-backed navigation and filters             |
| `tests/domain-overview-filters.perf.spec.ts`                                                              | Filter performance                                |

Tenant isolation is on the list of hard invariants in
`docs/maintainers/review-guidelines.md`, and its browser suite has never gated
a merge.

## Workflows that do nothing on this fork

| Workflow                | Gate                                                |              Runs in the window |
| ----------------------- | --------------------------------------------------- | ------------------------------: |
| `pr-preview.yml`        | `bensenescu/open-seo`, `every-app/private-open-seo` | 397 triggered, all jobs skipped |
| `docker-image.yml`      | `every-app/open-seo`                                | 185 triggered, all jobs skipped |
| `deploy-production.yml` | `bensenescu/open-seo`, `every-app/private-open-seo` |             1 dispatch, skipped |
| `deploy-website.yml`    | same                                                |            4 triggered, skipped |

These cost no runner time, but they add 582 skipped runs of noise to the
Actions tab and to every pull request's check list.

`release.yml` is the exception: it has **no** repository gate and runs a full
`everyapp release` build on every pull request, 1.3 min P50 and 85 runner-min
over the window. Relay deploys through Alchemy, not through
`everyapp install`, so it is validating a path this fork does not ship.
