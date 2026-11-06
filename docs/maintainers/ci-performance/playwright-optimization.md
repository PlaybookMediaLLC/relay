# Browser testing

Where the E2E suites spend their time, what is changed, what is deliberately
not changed yet, and whether Stagehand belongs in this pipeline.

## What the suites cost

Measured over 67 core and 69 growth jobs, 2026-10-26 to 2026-11-06.

| Step                          |    core P50 |     core P95 |  growth P50 |   growth P95 |
| ----------------------------- | ----------: | -----------: | ----------: | -----------: |
| Run the spec                  |       126 s |        139 s |        99 s |        114 s |
| Migrate the local D1 database |        39 s |         42 s |        39 s |         43 s |
| Install Chromium              |        21 s |        134 s |        21 s |    **522 s** |
| Install dependencies          |        17 s |         22 s |        17 s |         21 s |
| Setup Node.js                 |         9 s |         18 s |         8 s |         16 s |
| **Job total**                 | **3.8 min** | **13.1 min** | **3.3 min** | **13.3 min** |

Inside the spec step, from run `41929235693`:

| Phase                                                 | Duration |
| ----------------------------------------------------- | -------: |
| Vite dev server boot (step start to first test)       |   33.8 s |
| `main pages load cleanly at 1400px`                   |   33.7 s |
| `main pages load cleanly at 390px`                    |   27.5 s |
| `Back returns to the page before the /app redirect`   |    8.5 s |
| `project settings keep a rejected domain and say why` |    8.2 s |
| `rank tracking names a duplicate domain`              |   15.3 s |

So of a 3.8-minute core job, **93 seconds is assertions** and the rest is
getting to the point where an assertion can run.

## The Chromium download is the reliability problem

`playwright install --with-deps chromium` has a 21 s median, a 134 s P95 on
core, a **522 s** P95 on growth, and it failed outright six times in the
window — three on each job. That single step accounts for most of the gap
between these suites' 3-4 minute medians and their 13-minute P95s.

Breaking the step down from a run's log:

```
22:54:50.6  Installing dependencies...        <- apt
22:55:13.8  Downloading Chrome for Testing 147.0.7727.15
22:55:17.7  Downloading FFmpeg
22:55:18.5  Downloading Chrome Headless Shell
```

About 23 s is `apt-get`, about 7 s is the download — but the download is the
part that goes wrong, and it is the part with no bound on how long it takes.

**Change made:** `~/.cache/ms-playwright` is cached under the exact Playwright
version resolved at runtime (`playwright --version`), so a browser upgrade
always re-downloads and a steady state never does.

**Not changed:** `--with-deps` still runs. Dropping the apt step would save
another ~23 s, but whether `ubuntu-24.04` runner images carry every library
Chromium needs is a question to answer by measuring, not by assuming — a wrong
answer here does not fail loudly, it fails as a flaky browser launch.

## The D1 migration is pure setup

`pnpm db:migrate:local` applies **111 SQLite migrations** one at a time through
wrangler: 39 s on a runner, 25.4 s on a developer machine. The result is a pure
function of `drizzle/sqlite/**`, the `wrangler.jsonc` binding and the wrangler
version.

**Change made:** the migrated state at `.wrangler/state/v3/d1` is cached under
a hash of exactly those inputs.

The important detail is **when** it is saved. The specs write into that
database — `project settings keep a rejected domain` creates and archives a
project, `rank tracking names a duplicate domain` adds tracked domains — and
the core suite's `openDefaultProject()` helper navigates to `/app` and follows
whatever redirect it gets. A cache saved at the end of a job would hand the
next run a database with the previous run's projects in it, and quietly change
which project the tour visits. So the workflow uses
`actions/cache/restore` before the migration and `actions/cache/save`
immediately after it, never the combined action.

## Parallelism: deliberately not yet

The core suite's two longest tests are the same page tour at two viewport
widths, 61 s of the 93 s. Running them on two workers would cut about 27 s.

It is not done here, for a reason that is on the brief: **do not increase the
worker count until test-data isolation has been verified, and verify it under
repeated and adversarial execution, not one passing run.** The two tours are
read-only, but they share a dev server, a D1 database and a notion of "the
default project" with two tests that create, archive and mutate. The honest
experiment is:

1. `test.describe.configure({ mode: "parallel" })` on the viewport block only.
2. `--repeat-each=10` locally, then ten CI runs.
3. Keep it only if all of them pass.

That is [roadmap item P2-4](implementation-roadmap.md).

The Vite dev-server boot (33.8 s) is the other target. A production-mode
preview server would start faster but would stop exercising the dev path these
suites exist to cover, and the SSR build costs more than the 34 s it saves.
Caching `node_modules/.vite` across runs is the cheaper experiment
([P2-5](implementation-roadmap.md)).

## Coverage gaps

Four browser suites exist and **no workflow runs any of them**:

| Config                                     | Spec                                                                       | Covers                                            |
| ------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------- |
| `tests/playwright.mcp-isolation.config.ts` | `mcp-tenant-isolation.spec.ts` (416 lines)                                 | MCP tenant isolation                              |
| `tests/playwright.free-tools.config.ts`    | `web/tests/*.spec.ts`                                                      | Free-tool abuse and spend protection in a browser |
| `tests/playwright.config.ts`               | `app-navigation`, `domain-overview-filters`, `keyword-research-navigation` | Fixture-backed navigation and filters             |
| `tests/playwright.config.ts`               | `domain-overview-filters.perf.spec.ts`                                     | Filter performance                                |

A `package.json` script is not CI coverage. `pnpm test:e2e:mcp-isolation`
exists, is runnable, and has never gated a merge — while
`docs/maintainers/review-guidelines.md` lists tenant isolation as a hard
invariant.

The MCP isolation suite is the one worth adding first, because what it checks
is both security-relevant and not covered anywhere else. Its cost is not yet
measured; [P2-1](implementation-roadmap.md) is to measure it and add it if it
fits inside the budget the other suites already set.

## Stagehand

Evaluated against the question the brief asks: would an agent-driven browser
framework make this pipeline faster, cheaper or more reliable?

**What it is.** Stagehand (MIT, from Browserbase) wraps Playwright with three
natural-language primitives — `act()`, `observe()`, `extract()` — backed by a
model call, plus self-healing selectors. It runs against a local Chromium or
against Browserbase's hosted browsers. Browserbase bills browser time from
$0.12/hour on the $20/month Developer plan, plus model tokens, plus proxy
gigabytes; act/observe caching applies only when `env: BROWSERBASE`, so a local
run pays tokens for every repeated instruction.

**Why it does not replace these suites.**

1. **It does not touch the bottleneck.** 93 s of the core job's 228 s is
   assertions; the rest is Chromium, migrations and a Vite boot. Stagehand
   pays all of those too, and adds model latency on top of each step. The
   vendor's own benchmark compares `act`/`extract` against hand-written
   Playwright calls, not against a suite's end-to-end wall time.
2. **It replaces determinism with a probability.** These five core tests and
   the growth workflow are regression gates: a red run must mean the product
   broke. A model-interpreted `act("click Save changes")` can fail because the
   model had a bad day, and a gate that is sometimes wrong for reasons unrelated
   to the code is worse than a slow gate. The brief rules this out explicitly —
   do not silently replace deterministic tests with probabilistic agent actions.
3. **Cost moves the wrong way.** Runners are free on this public repository.
   Browserbase browser-hours, model tokens and proxy traffic are not. For a
   bootstrapped product, swapping a $0 line item for a metered one needs the
   speed case to be overwhelming, and it is not.
4. **Selector maintenance is not the pain here.** The argument for self-healing
   selectors is a suite that breaks on markup churn. These suites fail on
   Chromium downloads and, historically, on copy changes
   (`.agents/PAPERCUTS.md`, 2026-10-14) — the latter being exactly the kind of
   break a test _should_ catch.

**Where it would genuinely help.** Exploratory testing, off the critical path:
a scheduled job that walks SEO research, project management, opportunity
review, reporting and integration settings and reports what looks wrong. That
finds the regressions nobody wrote a test for, and anything it finds becomes a
deterministic Playwright test. It should never be a required check, and the
cost ceiling should be explicit before it is built.

**Recommendation.** Keep the division the brief sketches:

| Tool       | Job                                                |
| ---------- | -------------------------------------------------- |
| Vitest     | Service, contract and business-logic validation    |
| Playwright | Production-critical deterministic regression tests |
| Stagehand  | Scheduled exploratory testing, never a merge gate  |

Do not migrate. The measurements that would change this conclusion are in
[P3-1](implementation-roadmap.md): run one equivalent journey both ways,
twenty times each, and compare wall time, cost per run and failure rate. Until
that exists, this is a reasoned recommendation, not a measured one — and it is
labelled as such.

## Diagnostics

Both configs now add Playwright's `github` reporter under CI alongside `list`,
so a failing assertion is annotated on the pull request diff instead of only
appearing in a log someone has to open. Traces, screenshots and the
`test-results/` artifact upload on failure are unchanged.
