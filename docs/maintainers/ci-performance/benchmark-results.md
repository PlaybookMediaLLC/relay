# Benchmark results

Before and after, what is measured and what is not, and what is still
assumed.

- **Before:** 552 workflow runs on `develop` and `main`, 2026-10-26 to
  2026-11-06. Method: [README.md](README.md).
- **After:** runs of pull request
  [#223](https://github.com/PlaybookMediaLLC/relay/pull/223) on
  `perf/ci-pipeline-redesign`, same repository, same runner class, same days.

The "after" sample is small — a handful of runs, not 56 — so these are
measurements of the new pipeline, not yet a distribution. Where a figure is a
single observation, it says so.

## Headline

| Measure                           |                    Before (n=56) |                   After | Change                                       |
| --------------------------------- | -------------------------------: | ----------------------: | -------------------------------------------- |
| Pull-request wall-clock, P50      |                          6.3 min |                       — | —                                            |
| Pull-request wall-clock, observed | P90 13.5, P95 13.9, max 15.7 min | 3.6, 3.7, 4.1 min (n=3) | Below the old P50, far below the old P95     |
| Runner-minutes per commit         |                        25.9 mean |         24.4–26.3 (n=3) | Unchanged on a change that selects every job |
| Required `ci` context             |                      5.7 min P50 |             2.8–4.1 min | −30% to −50%                                 |
| Push to production                |                      6.2 min P50 |        not yet measured | Projected ~4.8 min, see below                |
| Checks gating production          |                    1 partial job |    4 complete workflows | Strictly stronger                            |
| Real-SQL suites run on Postgres   |                               36 |                      57 | +21, including all billing spend suites      |

Every "after" run was green.

## Per-job, before and after

| Job                              | Before P50 | After (observed)                                      |
| -------------------------------- | ---------: | ----------------------------------------------------- |
| `CI / ci` (monolith)             |    5.7 min | replaced                                              |
| → `static checks`                |          — | 1m33s, 1m49s, 1m51s                                   |
| → `unit and integration tests`   |          — | 2m21s, 2m52s, 2m58s                                   |
| → `worker and standalone builds` |          — | 1m22s, 1m29s, 1m32s                                   |
| → `website checks and build`     |          — | 1m16s, 1m18s, 1m25s                                   |
| → `changes`                      |          — | 5s, 7s, 8s                                            |
| → `ci` (summary)                 |          — | 2s, 3s, 4s                                            |
| `CI / docker-build`              |    2.6 min | 16s–2m12s (selected by path; warm layer cache varies) |
| `CI / standalone-image`          |    3.0 min | 2m4s–3m11s (selected by path)                         |
| `E2E core flows`                 |    3.8 min | 3m37s, 3m49s                                          |
| `E2E growth workflow`            |    3.3 min | 2m58s, 3m10s, 3m16s                                   |
| `Postgres` (one job, 36 suites)  |    2.2 min | replaced                                              |
| → 3 shards, 57 suites            |          — | 1m05s–1m26s each, in parallel                         |
| → `postgres` (summary)           |          — | 3s, 4s                                                |
| `Security / static`              |    3.7 min | 3m8s, 3m31s (untouched)                               |
| `Release`                        |    1.3 min | 1m11s–1m23s (untouched)                               |

The execution graph for the fastest observed run (`ebc84b7b`), seconds from
the first job start:

```
    3s ->   10s   CI / changes
    3s ->  113s   CI / static checks
    4s ->  182s   CI / unit and integration tests
   13s ->  102s   CI / worker and standalone builds
   13s ->   98s   CI / website checks and build
   12s ->  136s   CI / standalone-image
   13s ->  145s   CI / docker-build
  185s ->  187s   CI / ci                              <- required context
    3s ->   89s   Postgres shards 1-3 (parallel)
   92s ->   96s   Postgres / postgres
    3s ->  199s   E2E growth
    3s ->  214s   Security / static
    4s ->   87s   Release
```

Total wall 3.6 min, against a 6.3-minute P50 and a 13.9-minute P95 before.

## What produced the saving

| Change                                  | Mechanism                                                                 | Measured effect                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Parallel CI jobs                        | Six jobs start together instead of eleven serial steps                    | `ci` context 5.7 min → 2.8–4.1 min                                                                   |
| Postgres sharding                       | Three containers instead of one, `--no-file-parallelism` kept inside each | 2.2 min for 36 suites → ~1.4 min for 57                                                              |
| Local D1 cache                          | 111 migrations replaced by a cache restore                                | Migration step (39–40 s) disappears on a hit                                                         |
| Chromium cache                          | Browser download replaced by a cache restore                              | `Install Chromium` 21 s → 11–12 s on a hit                                                           |
| Prettier cache                          | Content-keyed cache for ~3,000 files                                      | `Run CI checks` 91 s P50 → 74–96 s                                                                   |
| Path-selected image builds              | `scripts/ci-affected.mjs`                                                 | Up to 5.6 min of runner time and two queue slots off a pull request that does not touch their inputs |
| Deploy gate instead of duplicate checks | Waits for checks that already ran                                         | Removes ~250 s from the deploy path                                                                  |

## Two regressions found and fixed during the work

**1. The website type check depended on the root install.**

Splitting the monolithic job failed `Run website type checks` in 18 s.
`web/tsconfig.json` includes `**/*.ts`, so it type-checks
`web/tests/free-tool-verification.spec.ts`, which imports the root-only
`@playwright/test`. It had only ever passed because the root install ran
earlier in the same job. The website job now installs both workspaces; the
2026-10-06 `.agents/PAPERCUTS.md` entry has the real fix.

**2. Caching the D1 state cached a 5.8 MB write-ahead log.**

After the D1 cache started hitting, the migration step vanished — and both
specs got slower by about the same amount:

|                                 | Migration |                                    Spec |                       Job |
| ------------------------------- | --------: | --------------------------------------: | ------------------------: |
| Baseline                        |      39 s |            126 s (core) / 99 s (growth) |             3.8 / 3.3 min |
| Cache hit, WAL included         |       0 s | 163, 166 s (core) / 119, 120 s (growth) | 3m37s–3m49s / 2m58s–3m10s |
| Cache miss, after checkpointing |      40 s |                      — / 103 s (growth) |                 — / 3m16s |

`wrangler d1 migrations apply --local` leaves 5.8 MB of WAL against a 2.1 MB
database. Restoring that makes the first connection replay the log, which cost
about what replaying the migrations would have — a net saving of zero.

`scripts/ci-checkpoint-d1.mjs` now runs `PRAGMA wal_checkpoint(TRUNCATE)` and
removes the sidecar files before the cache is saved. Verified locally: 8.2 MB
→ 2.1 MB, `PRAGMA integrity_check` returns `ok`, 148 tables, all 111
migrations recorded. The cache key is `d1-local-v2-` so pre-checkpoint entries
are not reused.

**The combination of a hit on the checkpointed cache has not yet been
observed.** The expectation is a ~40 s saving with the spec back at its
baseline duration; until a run shows that, it is a projection.

## One problem the caching did not remove

On run `42271506195`, `Install Chromium` hit the cache in 4 s and then
**stalled for more than eight minutes** with the browser already on disk. The
remaining work at that point is `apt`, which is where the step's 522 s P95 and
six failures came from in the first place.

The cache removes the download. It does not remove apt. That step now runs
under `timeout 300` with one retry, so a stalled mirror costs at most ten
minutes instead of the job's whole budget — a bound, not a fix. Running these
jobs in the official Playwright container, where browsers and system libraries
are both preinstalled, is the fix, and it is a measurement
([P2-5](implementation-roadmap.md)) rather than a change to make blind.

## Not measured

| Claim                                   | Status                                                                                                                                                                                                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Push to production under ~5 min         | **Projected**, not measured. Nothing on this branch has been merged to `main`, and measuring it means a real production deploy, which needs authorization. The arithmetic: the gate waits for the slowest required check (~3.0–3.6 min observed) and the deploy job was 1.8 min P50 before and is unchanged. |
| The deploy gate blocks a bad commit     | **Verified against real data, not in a live deploy.** The polling logic was run locally against three commits: it passes `750172ed`, and blocks `304151c8` with `ci(cancelled) e2e-core(failure) e2e-growth(failure)` and `b2131aa4` with `ci(failure)`.                                                     |
| Affected-component selection skips jobs | **Verified by unit test and locally**, not in CI. Pull request #223 changes `ci.yml` and `pnpm-lock.yaml`-adjacent files, so it correctly selects every job. Selection is per pull request, against the merge base, not per push, so no commit on this branch can demonstrate a skip.                        |
| Chromium cache effect on the P95 tail   | **Partially measured.** On a hit the step is 11–12 s against a 21 s median. Whether it moves the 522 s P95 needs weeks of runs.                                                                                                                                                                              |
| Prettier cache saving                   | **Weakly measured.** `Run CI checks` ranged 74–96 s against a 91 s P50 baseline; the variance between runners is larger than the effect. The local measurement is unambiguous: 13.1 s cold, 1.8 s warm.                                                                                                      |
| Postgres suites pass on Postgres        | **Measured.** All three shards passed on every run, including the 21 suites that had never run against Postgres.                                                                                                                                                                                             |
| Runner-minute reduction of 25–40%       | **Not achieved on this pull request**, which selects every job (24.4–26.3 against a 25.9 mean). The reduction applies to pull requests that do not touch the image inputs, where the two image jobs (5.6 min) drop out. A representative figure needs weeks of normal pull requests.                         |

## Against the brief's targets

| Metric                       | Target        | Result                                                                                                                                                                 |
| ---------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First useful PR feedback     | < 2 min       | **Close.** `changes` reports at 10 s; `static checks` at 1m33s–1m51s. Before, the first signal was the whole 5.7-minute job.                                           |
| Main CI job                  | < 4 min P50   | **Met.** `ci` context completes at 2.8–4.1 min.                                                                                                                        |
| Core E2E suite               | < 3 min P50   | **Not met.** 3m37s–3m49s, essentially unchanged, because the D1 saving was cancelled by the WAL problem. Expected to land near 3 min once the checkpointed cache hits. |
| Growth E2E suite             | < 2 min P50   | **Not met.** 2m58s–3m16s. About 50 s of it is install and Chromium, 103 s is the spec.                                                                                 |
| PostgreSQL validation        | < 2 min P50   | **Met**, with 58% more coverage: ~1.4 min.                                                                                                                             |
| Complete PR validation       | < 6 min P50   | **Met.** 3.6–4.1 min.                                                                                                                                                  |
| Verified merge to production | < 5 min       | **Projected ~4.8 min**, unmeasured.                                                                                                                                    |
| Runner-minutes               | −25 to −40%   | **Not shown.** See above.                                                                                                                                              |
| Flaky-test rate              | No regression | **No regression observed**; every run on the branch was green. The Chromium stall is the pre-existing failure mode, now bounded.                                       |
| Security and test coverage   | No regression | **Improved.** No check was removed. Postgres coverage went from 36 to 57 suites, and production deployment went from one partial gate to four complete ones.           |

## Reproducing

```sh
gh pr checks 223                                   # current state
node scripts/ci-affected.mjs origin/develop HEAD   # what a change selects
node scripts/ci-postgres-suites.mjs --count        # 57
pnpm run ci:check && pnpm test                     # the gates this repo requires
```
