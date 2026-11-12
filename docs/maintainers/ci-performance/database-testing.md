# Database testing

How the real-SQL suites are selected and isolated, and what the deployment
pipeline guarantees about migrations.

## Two dialects, one schema

Relay runs on D1/SQLite locally and in self-hosted installs, and on
PostgreSQL behind Hyperdrive in the hosted deployment. `AGENTS.md` requires
every schema change, query and mutation to work on both, and
`docs/maintainers/review-guidelines.md` lists dual-dialect persistence as a
hard invariant.

`src/server/features/opportunities/repositories/opportunityRepositoryTestDb.ts`
is where that is decided at test time. With `OPPORTUNITY_TEST_PG_URL` set it
returns a Postgres-backed database; without it, an in-memory SQLite one. The
same test files therefore run twice: once on SQLite in the main unit job, once
on Postgres in `postgres-tests-playbook.yml`.

The module refuses any URL that is not `127.0.0.1` with the database
`openseo_growth_test`, so a mutating integration suite can never be pointed at
a real database. Unchanged.

## The suite list had fallen behind

`postgres-tests-playbook.yml` listed nine paths by hand:

```
opportunities  publishing  experiments  growth  seo-checks
split-tests  portfolio  protection  reports/services/ReportBrandingService.test.ts
```

Walking the import graph from that one root module finds **57** test files that
reach real SQL. The list covered 36. The 21 it missed had never run against
Postgres:

```
src/server/billing/aiSpend.test.ts
src/server/billing/spendAdmission.test.ts
src/server/billing/spendReconcile.test.ts
src/server/features/spend/SpendLimitService.test.ts
src/server/features/accessibility/AccessibilityCheckService.test.ts
src/server/features/accessibility/accessibilityStep.test.ts
src/server/features/activity/auditEvents.test.ts
src/server/features/activity/auditPublishing.test.ts
src/server/features/conversion/ConversionDetectionService.test.ts
src/server/features/conversion/ConversionGateService.test.ts
src/server/features/conversion/CopyDraftService.test.ts
src/server/features/docs/docsIndex.test.ts
src/server/features/performance/PerformanceLabService.test.ts
src/server/features/performance/PerformanceResultService.test.ts
src/server/features/performance/fieldData.test.ts
src/server/features/performance/performanceSignals.test.ts
src/server/features/revenue/RevenueConnectionService.test.ts
src/server/features/revenue/revenueSync.test.ts
src/server/features/support/supportSync.test.ts
src/server/features/work/workData.test.ts
src/server/lib/audit/rendering-billing.test.ts
```

Every billing and spend suite was in that set. `.agents/PAPERCUTS.md` recorded
the mechanism on 2026-10-28: _"a new feature's dual-dialect tests silently run
on SQLite alone until someone adds its directory."_

## Discovery instead of a list

`scripts/ci-postgres-suites.mjs` computes the transitive closure of
"imports `opportunityRepositoryTestDb.ts`, or imports something that does" and
returns the `.test.ts` files in it. The closure matters: several suites reach
the root through a second helper —

```
opportunityRepositoryTestDb.ts
  <- opportunityRepositoryTestSupport.ts   <- 39 suites
  <- publishingTestDb.ts                   <- 12 suites
       <- experimentTestDb.ts, protectionTestDb.ts
```

— so matching the root's name alone would have found 18 files instead of 57.

The script resolves relative and `@/`-aliased specifiers against the real files
on disk, and **exits non-zero if it finds fewer than 30 suites**. A broken
closure fails the job rather than quietly checking less, which is the failure
mode that produced the original gap.

Run it locally:

```sh
node scripts/ci-postgres-suites.mjs          # one path per line
node scripts/ci-postgres-suites.mjs --count  # 57
```

## Isolation: one Postgres per shard

The suites share rows, and running them concurrently against one database
fails. From `.agents/PAPERCUTS.md`, 2026-10-16:

> With `OPPORTUNITY_TEST_PG_URL` set, running `publishing/` and
> `opportunities/` together fails 1 to 2 tests at random; each file passes
> alone.

The old workflow handled that with `--no-file-parallelism` on a single job:
correct, and strictly serial.

Five designs were considered for getting parallelism back:

| Option                                                       | Isolation                       | Code change                                                                           | Verdict                                                                                                   |
| ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| One shared database, `--no-file-parallelism`                 | None; serialization substitutes | none                                                                                  | The status quo. Correct, slow, does not scale with the suite count                                        |
| Per-worker Postgres schemas via `search_path`                | Good                            | `opportunityRepositoryTestDb.ts` + migration runner must become schema-aware          | Real work in a module every real-SQL suite depends on, to speed up a job that is not on the critical path |
| Transaction-per-test rollback                                | Partial                         | Breaks suites that assert on committed state or test transaction behaviour themselves | Rejected: these suites exist partly to check transaction behaviour                                        |
| Template database, `CREATE DATABASE ... TEMPLATE` per worker | Good                            | A setup script, plus connection-limit tuning                                          | Viable, but it reimplements what a container already gives                                                |
| **One Postgres service container per shard job**             | **Total, by construction**      | **none**                                                                              | **Chosen**                                                                                                |

GitHub's `services:` are per-job, so a three-way job matrix gets three
independent Postgres 16 containers for free. No product or test code changes,
no shared rows between shards, and the documented intra-database race is
preserved by keeping `--no-file-parallelism` **within** each shard.

```yaml
strategy:
  fail-fast: false
  matrix:
    shard: [1, 2, 3]
services:
  postgres: { image: postgres:16, ... }
```

Each shard applies the migrations to its own container, discovers the suite
list, and runs `vitest run $(cat suites.txt) --shard=N/3 --no-file-parallelism`.

Measured on the first run of the new workflow: shards took 1m09s, 1m17s and
1m16s wall, of which the test work itself was 21–30 s; the rest is container
startup (15 s), install (16 s) and `setup-node` (8 s). The old single job was
2.2 min P50 for 36 suites.

`fail-fast: false` is deliberate: one shard failing should not hide what the
other two would have found.

A `postgres` summary job collapses the three shard contexts into the single
status check the deploy gate waits for. **Keep that job id `postgres`** — a
matrix job reports one check per shard and no aggregate context.

## What is still only checked on SQLite

Everything outside the closure — about 390 of the 448 test files — never
touches real SQL in the first place: they mock repositories or test pure
logic. That is correct; adding them to the Postgres job would spend time to
re-run the same assertions against a different mock.

The guard that keeps this honest is the discovery script. A new suite that
calls `createOpportunityTestDatabase`, directly or through a helper, is picked
up automatically on its first CI run.

## Migration safety

### In CI

Each Postgres shard runs `pnpm db:migrate:pg` against its own throwaway
container. The E2E jobs apply the 111 SQLite migrations to a local D1, and now
cache the result — keyed on `drizzle/sqlite/**`, `wrangler.jsonc` and the
lockfile, and **saved immediately after the migration**, before the specs write
to that database. See
[playwright-optimization.md](playwright-optimization.md#the-d1-migration-is-pure-setup).

`src/db/schema-parity.test.ts` (659 assertions) runs in the unit job and keeps
the SQLite and Postgres schema definitions aligned.

### In production

`deploy-playbook.yml` runs `pnpm db:migrate:pg` against the production
Postgres, then builds and deploys. Three properties are preserved exactly:

1. **`concurrency: deploy-playbook`, `cancel-in-progress: false`.** Two
   deploys never overlap, and a newer push can never cancel a running
   migration. A queued deploy waits; a half-applied migration is worse.
2. **Migrations run inside the deploy job**, after the gate, so they only run
   against a commit whose CI, both browser suites and all three Postgres
   shards passed. Before this change they ran after a four-minute subset of
   CI, while the browser suites were still going.
3. **The configuration is validated before anything is built or migrated.**
   The `Validate deployment configuration` step fails in seconds on a wrong
   domain, auth mode or short secret.

### The gap this does not close

`drizzle-kit migrate` applies migrations one at a time and records each in its
journal, so a failure stops at a known point and the deploy fails before the
Worker is updated. The database is then **ahead of the running Worker** — which
is safe for an additive migration and unsafe for a destructive one.

Nothing in the pipeline enforces that migrations are additive. The practice
that would — expand and contract, where a release only ever adds and a later
release removes what nothing reads — is a convention, not a check. Writing it
down, and adding a check for destructive statements in a migration that ships
with code depending on their absence, is
[P2-7](implementation-roadmap.md). It is a correctness item rather than a
performance one, which is why it is not in this change.

Rolling the application back after a migration has applied is likewise a
manual operation today: redeploy the previous commit, and accept that its code
runs against the newer schema. That works for additive migrations and is the
reason the convention matters.
