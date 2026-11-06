# CI/CD performance

Measurements and the redesign they justify, for Relay's pull-request
validation, build and production deployment pipelines.

These notes live under `docs/maintainers/` rather than the `docs/engineering/`
path the original brief suggested, because `AGENTS.md` reserves everything in
`docs/` outside `docs/maintainers/` for user-facing documentation.

| File                                                       | What it holds                                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [baseline.md](baseline.md)                                 | Measured timings, runner-minutes, flakiness and duplicated work              |
| [current-architecture.md](current-architecture.md)         | What runs today, on which trigger, and what gates production                 |
| [target-architecture.md](target-architecture.md)           | The redesigned graph, deploy gate, caches and failure handling               |
| [playwright-optimization.md](playwright-optimization.md)   | Browser suite costs, coverage gaps, parallelism and the Stagehand evaluation |
| [build-and-cache-strategy.md](build-and-cache-strategy.md) | pnpm, Prettier, Vite, Worker and Docker build costs and caches               |
| [database-testing.md](database-testing.md)                 | D1 and Postgres isolation, suite discovery, migration safety                 |
| [implementation-roadmap.md](implementation-roadmap.md)     | Ranked backlog with effort, risk and expected impact                         |
| [benchmark-results.md](benchmark-results.md)               | Before and after, and what is still assumed rather than measured             |

## How the measurements were taken

All timings come from the GitHub Actions REST API for
`PlaybookMediaLLC/relay`, not from the UI:

- `GET /actions/runs` for 600 runs, of which 552 had jobs (the rest are
  entirely-skipped runs of workflows gated to upstream repositories).
- `GET /actions/runs/{id}/jobs` for job and step start and end times.

The window is **2026-10-26 to 2026-11-06**, 11 days. Percentiles are over
successful jobs unless a row says otherwise, and every table names its sample
size. Numbers produced on a developer machine, rather than on a runner, say so.

Reproduce the collection with:

```sh
for page in 1 2 3 4 5 6; do
  gh api "repos/PlaybookMediaLLC/relay/actions/runs?per_page=100&page=$page" \
    --jq '.workflow_runs[] | [.id,.name,.event,.head_branch,.head_sha,.conclusion,.created_at,.run_started_at] | @tsv'
done > runs.tsv

cut -f1 runs.tsv | xargs -P8 -I{} gh api \
  "repos/PlaybookMediaLLC/relay/actions/runs/{}/jobs?per_page=100" \
  --jq '.jobs[] | ["{}",.workflow_name,.name,.status,.conclusion,.started_at,.completed_at] | @tsv' > jobs.tsv
```

## One fact that reframes the cost question

The repository is **public**, so GitHub-hosted standard runners cost nothing.
Runner-minutes are still worth reducing, but as a _queueing_ resource against
the 20-concurrent-job ceiling, not as a bill. Wall-clock time and developer
attention are the scarce resources here, so this work reports wall-clock and
runner-minutes separately and optimises the first.
