# Benchmark results

Before and after, what is measured and what is not, and what is still
assumed.

- **Before:** 552 workflow runs on `develop` and `main`, 2026-10-26 to
  2026-11-06. Method: [README.md](README.md).
- **After:** four complete runs of pull request
  [#223](https://github.com/PlaybookMediaLLC/relay/pull/223) on
  `perf/ci-pipeline-redesign` — same repository, same runner class, same days.

Four runs is a measurement of the new pipeline, not yet a distribution. Every
figure below is either an observed value with its sample, or labelled as a
projection.

## Headline

| Measure                         |                             Before (n=56) |            After (n=4) | Change                                                                 |
| ------------------------------- | ----------------------------------------: | ---------------------: | ---------------------------------------------------------------------- |
| Pull-request wall-clock         | P50 6.3, P90 13.5, P95 13.9, max 15.7 min | 3.6, 3.7, 3.9, 4.1 min | Every run beats the old P50; the worst is 3.5× better than the old P95 |
| Runner-minutes per commit       |                                 25.9 mean | 24.4, 26.1, 26.3, 27.8 | Unchanged on a change that selects every job                           |
| Required `ci` context ready at  |                               5.7 min P50 | 2.8, 2.8, 4.1, 4.1 min | −28% to −50%                                                           |
| Push to production              |                               6.2 min P50 |           not measured | Projected ~4.8 min                                                     |
| Checks gating production        |                             1 partial job |   4 complete workflows | Strictly stronger                                                      |
| Real-SQL suites run on Postgres |                                        36 |                     57 | +21, including every billing spend suite                               |

Every run on the branch was green.

**The critical path moved.** It used to be the 5.7-minute serial `CI / ci`
job. It is now `Security / static` (3m8s–3m50s) and `e2e-core`
(3m25s–3m49s) — neither of which this change touches. Further work has to
start there, not in CI.

## The execution graph

The last run (`0316cc07`), seconds from the first job start. Sixteen jobs,
fifteen of which begin within twenty seconds of each other:

```
    3s ->   12s   CI / changes
    3s ->  134s   CI / static checks
    3s ->  158s   CI / unit and integration tests
   16s ->  109s   CI / worker and standalone builds
   15s ->   96s   CI / website checks and build
   15s ->  123s   CI / docker-build
   16s ->  161s   CI / standalone-image
  165s ->  169s   CI / ci                        <- the required context
    3s ->   90s   Postgres shards 1-3 (parallel)
   93s ->   95s   Postgres / postgres
    4s ->  199s   E2E growth
   20s ->  225s   E2E core                       <- critical path
    3s ->  233s   Security / static              <- critical path
    3s ->   83s   Release
```

Total wall 3.9 min. The required `ci` context is ready at 2.8 minutes; the
run then waits another minute on the security scan and the core browser suite.

## Per job

| Job                              | Before P50 | After (every observation)  |
| -------------------------------- | ---------: | -------------------------- |
| `CI / ci` (the monolith)         |    5.7 min | replaced                   |
| → `changes`                      |          — | 5s, 7s, 8s, 9s             |
| → `static checks`                |          — | 1m33s, 1m49s, 1m51s, 2m11s |
| → `unit and integration tests`   |          — | 2m21s, 2m35s, 2m52s, 2m58s |
| → `worker and standalone builds` |          — | 1m22s, 1m29s, 1m32s, 1m33s |
| → `website checks and build`     |          — | 1m16s, 1m18s, 1m21s, 1m25s |
| → `ci` (summary)                 |          — | 2s, 3s, 4s, 4s             |
| `CI / docker-build`              |    2.6 min | 16s, 1m31s, 1m48s, 2m12s   |
| `CI / standalone-image`          |    3.0 min | 2m4s, 2m25s, 2m32s, 3m11s  |
| `E2E core flows`                 |    3.8 min | 3m25s, 3m37s, 3m49s        |
| `E2E growth workflow`            |    3.3 min | 2m58s, 3m10s, 3m15s, 3m16s |
| `Postgres` (1 job, 36 suites)    |    2.2 min | replaced                   |
| → 3 shards, 57 suites, parallel  |          — | 1m05s–1m27s each           |
| → `postgres` (summary)           |          — | 2s, 3s, 4s, 4s             |
| `Security / static` (untouched)  |    3.7 min | 3m8s, 3m22s, 3m31s, 3m50s  |
| `Release` (untouched)            |    1.3 min | 1m11s, 1m18s, 1m20s, 1m23s |

## What produced the saving

| Change                                  | Mechanism                                                                 | Measured effect                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Parallel CI jobs                        | Six jobs start together instead of eleven serial steps                    | `ci` context 5.7 min → 2.8–4.1 min                                                                   |
| Postgres sharding                       | Three containers instead of one; `--no-file-parallelism` kept inside each | 2.2 min for 36 suites → ~1.4 min for 57                                                              |
| Local D1 cache                          | 111 migrations replaced by a cache restore                                | −40 s of migration, +17–25 s of spec time: see below                                                 |
| Chromium cache                          | Browser download replaced by a cache restore                              | `Install Chromium` 21 s P50 → 11–17 s on a hit                                                       |
| Prettier cache                          | Content-keyed cache for ~3,000 files                                      | Local: 13.1 s → 1.8 s. In CI, inside the noise                                                       |
| Path-selected image builds              | `scripts/ci-affected.mjs`                                                 | Up to 5.6 min of runner time and two queue slots off a pull request that does not touch their inputs |
| Deploy gate instead of duplicate checks | Waits for checks that already ran on the SHA                              | Removes ~250 s from the deploy path                                                                  |

## Three things that did not go to plan

### 1. The website type check depended on the root install

Splitting the monolithic job failed `Run website type checks` in 18 s.
`web/tsconfig.json` includes `**/*.ts`, so it type-checks
`web/tests/free-tool-verification.spec.ts`, which imports the root-only
`@playwright/test`. It had only ever passed because the root install ran
earlier in the same job. The website job now installs both workspaces; the
2026-10-06 `.agents/PAPERCUTS.md` entry has the real fix.

### 2. The D1 cache saves much less than the migration costs

The migration step is 39–40 s and the cache removes it. But both specs then
got slower:

| D1 state                             |  core spec | growth spec |
| ------------------------------------ | ---------: | ----------: |
| Freshly migrated (baseline, n=67/69) |  126 s P50 |    99 s P50 |
| Freshly migrated (this branch, n=1)  |          — |       103 s |
| Restored, write-ahead log included   | 163, 166 s |  119, 120 s |
| Restored, checkpointed               |      151 s |       120 s |

Two separate effects, found in that order:

**The write-ahead log.** `wrangler d1 migrations apply --local` leaves 5.8 MB
of WAL against a 2.1 MB database. Cached as-is, the next run's first
connection replays it. `scripts/ci-checkpoint-d1.mjs` now runs
`PRAGMA wal_checkpoint(TRUNCATE)` before the save — verified locally: 8.2 MB →
2.1 MB, `PRAGMA integrity_check` returns `ok`, 148 tables, all 111 migrations
recorded. That recovered 15 s on the core spec and nothing on growth.

**The migration was also a warm-up.** `db:migrate:local` runs wrangler, which
loads miniflare and workerd — the same modules the Vite dev server loads
thirty seconds later. Removing the migration moves that cost into the spec
step rather than deleting it. This explains the residual 17–25 s and why
checkpointing only partly closed it.

**Net: the D1 cache is worth about 15–25 s per browser job, not 40 s.** It is
kept because `e2e-core` is on the critical path, so seconds off it are seconds
off the whole run — but the cache is more machinery than its saving deserves,
and that is recorded here rather than claimed away.

### 3. Caching the browser did not remove the browser step's tail

On run `42271506195`, `Install Chromium` hit the cache in 4 s and then
**stalled for over eight minutes** with the browser already on disk. The
remaining work at that point is `apt`, which `--with-deps` shells out to —
and apt is where the step's 522 s P95 and six outright failures came from.

The cache removes the download. It does not remove apt. That step now runs
under `timeout 300` with one retry, so a stalled mirror costs at most ten
minutes instead of the job's entire budget. That is a bound, not a fix.
Running these jobs in the official Playwright container, where browsers and
system libraries are both preinstalled, is the fix — and it is a measurement
to make, not a change to make blind.

## Not measured

| Claim                                   | Status                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push to production under ~5 min         | **Projected, not measured.** Nothing on this branch has been merged to `main`, and measuring it means a real production deploy, which needs authorization. The arithmetic: the gate waits for the slowest required check (3.4–3.8 min observed for `ci`, `e2e-core`, `e2e-growth`, `postgres`) and the deploy job was 1.8 min P50 before and is unchanged. |
| The deploy gate blocks a bad commit     | **Verified against real data, not in a live deploy.** The polling logic was run locally against three commits: it passes `750172ed`, and blocks `304151c8` with `ci(cancelled) e2e-core(failure) e2e-growth(failure)` and `b2131aa4` with `ci(failure)`.                                                                                                   |
| Affected-component selection skips jobs | **Verified by unit test and locally**, not in CI. Pull request #223 changes `ci.yml` and `package.json`, so it correctly selects every job. Selection is per pull request against the merge base, not per push, so no commit on this branch can demonstrate a skip.                                                                                        |
| Chromium cache effect on the P95 tail   | **Not shown.** On a hit the step is 11–17 s against a 21 s median, and one cache hit still stalled for eight minutes. Whether the bounded retry moves the P95 needs weeks of runs.                                                                                                                                                                         |
| Prettier cache saving                   | **Not shown in CI.** `Run CI checks` ranged 74–96 s against a 91 s P50 baseline; runner-to-runner variance is larger than the effect. The local measurement is unambiguous: 13.1 s cold, 1.8 s warm.                                                                                                                                                       |
| Postgres suites pass on Postgres        | **Measured.** All three shards passed on all four runs, including the 21 suites that had never run against Postgres.                                                                                                                                                                                                                                       |
| Runner-minute reduction of 25–40%       | **Not achieved on this pull request**, which selects every job (24.4–27.8 against a 25.9 mean). The reduction applies to pull requests that do not touch the image inputs, where the two image jobs (5.6 min at baseline) drop out. A representative figure needs weeks of normal pull requests.                                                           |

## Against the brief's targets

| Metric                       | Target        | Result                                                                                                                                                                                                   |
| ---------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First useful PR feedback     | < 2 min       | **Met.** `changes` reports at 5–12 s; `website checks` at 1m16s; `static checks` at 1m33s. Before, the first signal was the whole 5.7-minute job, and the first _failing_ signal arrived at 3.6 min P50. |
| Main CI job                  | < 4 min P50   | **Met.** The `ci` context completes at 2.8–4.1 min, median 3.4.                                                                                                                                          |
| Core E2E suite               | < 3 min P50   | **Not met.** 3m25s–3m49s against a 3.8 min baseline. The D1 saving was largely cancelled (see above).                                                                                                    |
| Growth E2E suite             | < 2 min P50   | **Not met.** 2m58s–3m16s against 3.3 min. About 50 s is install and Chromium; 103–120 s is the spec.                                                                                                     |
| PostgreSQL validation        | < 2 min P50   | **Met**, with 58% more coverage: ~1.4 min.                                                                                                                                                               |
| Complete PR validation       | < 6 min P50   | **Met.** 3.6–4.1 min, worst case.                                                                                                                                                                        |
| Verified merge to production | < 5 min       | **Projected ~4.8 min**, unmeasured.                                                                                                                                                                      |
| Runner-minutes               | −25 to −40%   | **Not shown.** See above.                                                                                                                                                                                |
| Flaky-test rate              | No regression | **No regression observed** — all four runs green. The Chromium stall is the pre-existing failure mode, now bounded rather than removed.                                                                  |
| Security and test coverage   | No regression | **Improved.** No check was removed. Postgres coverage went from 36 to 57 suites, and production deployment went from one partial gate to four complete ones.                                             |

## Reproducing

```sh
gh pr checks 223                                   # current state
node scripts/ci-affected.mjs origin/develop HEAD   # what a change selects
node scripts/ci-postgres-suites.mjs --count        # 57
pnpm run ci:check && pnpm test                     # the gates this repo requires
```
