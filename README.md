# Relay

**Turn customer demand into approved acquisition work, and learn from what actually happens.**

Relay, by Playbook Media LLC, is building a code-native growth execution product for **independent software founders**. It connects search and website evidence to one practical improvement: choose a relevant opportunity, prepare a narrow change in the founder's repository, obtain exact approval, verify it live, and track later acquisition observations without claiming unsupported traffic or revenue lift.

**Today:** Relay has a substantial open-source SEO, GitHub publishing and measurement foundation. **First proof:** an existing-page opportunity → founder-approved GitHub PR → independently verified production change. **Company ambition:** a recurring customer-acquisition execution business that grows in value with founder-led software companies. Release assurance remains a complementary paid hypothesis; broad Sync, Product Reality Engine and Relay-owned Launch are not the default build direction.

[Use Relay](https://relay.playbookmedia.io) · [North-star vision](vision.md) · [Company thesis](company.md) · [Active growth milestones](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md) · [RFC implementation specifications](docs/maintainers/rfcs/implementation/README.md)

Relay is an independent, MIT-licensed derivative of [OpenSEO](https://github.com/every-app/open-seo); it retains upstream attribution, core research capabilities and reviewed upstream-sync. Some internal package and plugin names still say OpenSEO.

## Who Relay is for

A solo software founder can have a useful product and a functioning website but still struggle to get the right people to discover it. Keyword software supplies research. Search Console supplies partial evidence about what Google displayed. A coding assistant edits files. Analytics describes sessions and events. The founder still has to decide what is worth doing, explain why, make the change, ship it and remember whether it helped.

**Relay's proposed job is to complete that loop with the founder's approval**, using the website, repository and analytics accounts they already control.

The first target is a founder-led SaaS or developer-tool business with a GitHub-managed acquisition website, especially Next.js. An early site with little search data receives honest diagnostics and limited market research. A site with real Search Console history can receive query/page evidence, narrow recommendations and relevant follow-up. A founder with important existing traffic may place greater value on Protect's regression checks. None of those scenarios implies that an independent founder has a dedicated SEO employee or product-operations department.

### The first founder workflow

1. **Connect the website and establish context.** Set the production origin, repository, intended customer, important page and desired conversion. Connect Search Console and optionally GA4 when authorized. If data is sparse, Relay must say so.
2. **Review a specific opportunity.** Understand which query, page or technical issue was observed, when it was measured, how well it matches the product's buyer, the cost of further research and why the proposal is credible.
3. **Prepare one bounded change.** For supported files, inspect the exact source and proposed diff. If an edit relies on unverified product claims, an unsupported route or ambiguous source, stop and create a reviewable finding rather than guessing.
4. **Approve the PR, keep deployment control.** The founder authorizes the exact write. Relay creates the GitHub proposal; the repository's ordinary checks, review, merge and deployment rules continue to apply.
5. **Verify and observe.** Check the live destination independently when supported. Later, collect eligible Search Console/GA4 observations with enough data. Show technical completion separately from traffic, trials or revenue movement, and label inconclusive results honestly.

This integrated experience is the **M13 target**, not a claim that all five steps are already automated today. The repository already contains many of the separate components. The product work is connecting them safely and proving the real site-to-code-to-production journey.

### A concrete example of good judgment

An existing landing page appears for a buyer-intent search query but has an outdated description. A good Relay recommendation explains the observed query and page, describes the likely intent mismatch, checks the source and proposes a literal replacement only if the code mapping is supported. It does **not** conclude that changing a description guarantees a different search snippet or additional customers.

A completed technical task means the founder approved the exact change, deployed it through their own process, and the live page reflects the intended supported postcondition. A later Search Console change is an observation that may have other causes. If nothing is safe to change, recommending **no action** is a legitimate result.

## The bigger business we're building toward

Relay's entry product is a code-native SEO and website growth engineer. **The business ambition is larger: recurring customer-acquisition execution for software companies as they grow from independent founders into more established founder-led businesses.** Our explicit aspiration is to build a company that could support **$100M+ ARR**. That number is an ambition and useful constraint on strategy, **not** a customer forecast, proven market opportunity or current run rate.

A founder shouldn't have to open five dashboards, ask a coding assistant to interpret the data, prepare a PR, remember to check the deployment, and months later wonder whether the change produced useful customers. Relay should make that one ongoing, reviewable program. A customer who needs the service every week, trusts its execution and can define meaningful qualified outcomes has a different reason to subscribe than somebody comparing keyword research plans.

### Four requirements for moving beyond a small SEO tool

| Business requirement | What must actually change | What would prove progress |
| --- | --- | --- |
| **Broader commercial responsibility** | Own recurring founder-approved acquisition work, not only one technical SEO edit | Customers commission and complete multiple prioritized acquisition tasks against an agreed conversion objective |
| **Stronger recurring usage** | Make weekly evidence review, supported repeat actions, no-action decisions and retained learning useful | Paid founders return over several decision cycles and don't require manual rescue for every task |
| **Higher contract values** | Sell bounded acquisition programs with more meaningful work, coverage and reliability as companies grow | Actual upgrades, renewals and acceptable provider/support cost at higher prices |
| **Credible acquisition outcomes** | Connect independent technical delivery receipts to observed discovery, qualified behavior and economic results | Four separate evidence layers, real coverage, confidence limits and no fabricated incremental revenue |

A recurring **acquisition program** defines the site or approved channel, target buyer, qualified conversion, data coverage, review cadence, allowed actions, owner, source permissions and monthly usage limits. It can legitimately recommend no changes during a quiet week. Selling a fixed number of AI-written pages or guaranteed ranking improvements would produce the wrong incentives.

The intended long-term account path is to **land with an independent founder and expand with the same software business** as its acquisition needs, website traffic, products and team increase. That does not require enterprise complexity in first-run onboarding.

For the full operating model, staged packaging, outcome confidence and stop conditions see [Acquisition Execution Scale Plan](docs/maintainers/ACQUISITION-EXECUTION-SCALE-PLAN.md).

### Reporting four distinct results

- **Execution:** Did the exact founder-approved change reach the real production destination and pass its expected technical check?
- **Discovery:** What do Search Console, authorized sessions and reproducible AI-search samples show about exposure?
- **Qualified behavior:** Did correctly defined, consented signup, trial, demo or activation events occur, with reliable coverage?
- **Economic result:** Are there source-backed paying customers or qualified pipeline records? What limits attribution, and is any incremental effect identifiable?

A positive search trend after a deployment is **not proof** that the edit caused more customers. Relay should show which clocks are verified, observed, incomplete or unknown instead of collapsing them into a single success badge. The existing [Experiments & Results](docs/EXPERIMENTS.md) system is a starting point; it does not already provide causal acquisition measurement.

## What the repository contains

- Keyword discovery, rank tracking, backlinks, competitor/site research, AI visibility, and metered DataForSEO calls.
- Google Search Console and GA4 connections; source-backed SEO opportunities, prioritization, investigations and selected AI drafts.
- [GitHub publishing proposals](docs/GITHUB_PUBLISHING.md) for supported Next.js metadata and narrow copy/Markdown changes with exact reviewer authorization. Customer CI, merging and deployment remain under the customer's control.
- [Experiments and results](docs/EXPERIMENTS.md), SEO and release checks against supplied previews, before/after observation windows, eligible accessibility/performance tests, and first-touch Stripe attribution.
- Documentation indexing, scheduled jobs, notifications, spending limits, activity records, MCP and a weekly work view.

These are **implemented foundations**, not proof that a customer gained traffic or that every cross-system workflow is production-ready. The [dated codebase audit](docs/maintainers/relay-release-assurance-audit.md) records its original acceptance limits. The existing Protect baseline/incident/repair path has separate unfinished acceptance gates; the current growth workflow can reuse the already-supported SEO publisher and experiments without waiting for all historical Protect work.

## Capability and readiness map

The repository includes substantial feature work inherited from OpenSEO and added by Relay. The distinctions below are deliberate: **code present**, **integrated and operationally verified**, **planned**, and **commercially validated** are not interchangeable.

| Capability | Current code/documentation evidence | What is not yet established |
| --- | --- | --- |
| Keyword research, backlinks, domain/rank research, site audits and AI visibility | Existing upstream research services and hosted/self-hosted provider flows | That every source has fresh data for a given founder, or that research alone produces useful acquisition outcomes |
| Search Console and GA4 | Connections, opportunity detection, history, selected results and supporting measurements | Reliable onboarding for every external account and sufficient conversions for all result windows |
| Opportunity review and AI-assisted investigation | Existing review queue, evidence/history and approved drafts | Consistently correct selection of the *one best next action* for a particular founder |
| GitHub edits | Source-mapped supported Next.js metadata/copy/Markdown changes, exact proposal fingerprints, human authorization and PR recovery | General arbitrary-code editing, broad dynamic/templated site compatibility or automatic safe publishing |
| Experiments | Existing approved-PR tracking, merge verification, human deployment confirmation and Search Console observation windows | Automated end-to-end production deployment verification for all change classes or causal SEO lift |
| CI, site quality and specialized checks | Existing rule packs for selected SEO, accessibility, performance and release cases | Continuous protected-site monitoring, live coverage and supported repairs for every finding |
| Protect | Scoped enrollment code and RFCs for baselines, confirmed incidents, source-mapped repairs and original-rule verification | A complete, renewed paid protection service demonstrated across external customers |
| Recurring growth work | Work views, scheduling, budgets, drafts, research and partial history filters | A complete weekly founder-growth action loop with shared page memory and proven repeat paid use |
| AI-search opportunity execution | AI visibility research and prompt-related foundations | Reliable provider-comparable citation monitoring, an attributable website fix or willingness to pay for it |
| Cross-product Sync/Launch | Historical architecture/RFCs | That Relay should own product-ops, release kits, notifications or CRM execution; Shots is the primary release-communications product |

See [the technical RFC inventory](docs/maintainers/rfcs/README.md), [implementation order and historical statuses](docs/maintainers/rfcs/implementation/README.md), and the [dated release-assurance code audit](docs/maintainers/relay-release-assurance-audit.md). These explain exactly which features were implemented and which live/owner acceptance checks remain.

### Why this is different from another SEO dashboard

Research is useful only when a founder can decide what to do with it. Relay's product hypothesis is **opportunity → source-backed recommendation → narrowly approved website change → observed live result → later evidence and learning**. It should integrate with existing coding assistants and analytics, not replace them.

We are not optimizing for the number of monitored keywords, drafted pages, connected providers or AI messages. A small, justified change that ships correctly and teaches the founder something is more useful than another list of speculative opportunities.

## What we are building next

| Work | Goal | Decision |
| --- | --- | --- |
| **Growth v1** | One independent founder connects the relevant website evidence, approves a narrow existing-page edit and sees it independently verified live | [M13: first founder growth win](https://github.com/PlaybookMediaLLC/relay/milestone/13) |
| **Reusable execution** | Ground recommendations in evidence, keep exact code changes safe, verify deployment and measure later observations honestly | M1–M3; founder work history M5 |
| **Commercial validation** | Test paid founder interest in recurring **Grow** versus a bounded **Protect** monitoring/repair service | M7, with actual payment and support economics |
| **Recurring improvements** | Remember attempted changes, stop ineffective repeats, cautiously improve content and key acquisition paths | M10 and selected M9 slices after first real value |
| **AI-search discovery** | Find reproducible mention/citation opportunities that lead to safe, source-backed website work | M14 is demand-gated and experimental |

The old 46 technical RFCs and 31 implementation IRFCs remain preserved, with explicit history and acceptance criteria. Their prior Protect → Product Reality Engine → Sync → Launch queue is **no longer the company-wide automatic investment order**. See [RFC traceability](docs/maintainers/RFC-MILESTONE-TRACEABILITY.md) and the [founder growth roadmap](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md).

Release kits, product visuals, branded posts and distribution belong primarily to [Shots](https://github.com/PlaybookMediaLLC/shots); outbound contacts/campaigns belong to Verify/Warmbly. Relay owns acquisition opportunities, approved website changes and their observed outcomes. Any future connection among these products should be narrow and permissioned.

## Delivery priorities and release acceptance

### P0: first verified founder growth job

[**M13 — First founder growth win**](https://github.com/PlaybookMediaLLC/relay/milestone/13) is the central near-term release. It must establish one supported, authorized founder website; discover or select a credible existing-page opportunity; generate an exact reviewed proposal; get one approved PR created; observe the customer-controlled deployment; verify the intended live page state; and register or expose later measurement with explicit uncertainty.

The implementation is tracked in [#265: onboarding and first actionable recommendation](https://github.com/PlaybookMediaLLC/relay/issues/265) and [#266: approved change to production verification](https://github.com/PlaybookMediaLLC/relay/issues/266).

**The release gate is evidence on a real authorized site**, not simply passing CI, producing a diff, or merging a PR. The milestone also requires negative-path proof: stale source, invalid permissions, unsupported targets and missing production/analytics evidence must remain visible and fail safely.

M1, M2 and M3 retain the underlying research/safety, PR and technical-verification work. They can supply this first growth result without demanding completion of every older Protect IRFC.

### P0: commercial validation runs beside engineering

[**M7 — Grow versus Protect paid founder pilots**](https://github.com/PlaybookMediaLLC/relay/milestone/7) compares two possible paid jobs. Grow helps a founder implement acquisition improvements. Protect monitors selected important pages and repairs consequential regressions. Neither is assumed to have proven customer demand merely because the code or a pricing hypothesis exists.

[#267](https://github.com/PlaybookMediaLLC/relay/issues/267) tracks the founder paid-offer comparison, permissions, actual payments, support effort, provider cost, repeat work and reasons founders refuse. Playbook-owned sites are useful for engineering rehearsal; they are not evidence that external founders will pay.

### P1: repeatable founder acquisition work

M5 adds an understandable work history and next-action interface; M10 introduces selected existing-page improvements, longer-lived page memory and cooldowns; M9 allows carefully consented conversion/journey checks when they resolve an actual acquisition bottleneck. Expand supported edits one class at a time and keep a human in control.

### P2 and later: optional expansion

[**M14 — AI-search opportunity to reviewed action**](https://github.com/PlaybookMediaLLC/relay/milestone/14) is a bounded investigation: repeatable prompt/citation evidence, supported on-site recommendation, explicit provider cost and truthful uncertainty. It is not a promise that Relay can secure or guarantee model citations.

M4 preserves narrow product-claim safeguards. M6 contains possible evidence/connector extensions but **not** an approved mandate to build a universal Product Reality Engine. M8 is a conditional SEO/website handoff for a product launch; Shots owns release communication. M11 and M12 remain deferred or feasibility-gated.

The milestone numbers are stable GitHub IDs, **not execution order**. Use the [growth roadmap](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md) before assigning an agent a historical IRFC.

### Next growth milestones after the first shipped change

The original M13 website loop is necessary but insufficient for a larger recurring business. Four additional native GitHub milestones define the next company-building tests:

| Milestone | Customer or commercial result | Tracking |
| --- | --- | --- |
| **M15 — Recurring acquisition execution** | Weekly founder review and safe repeatable playbooks with page history, true no-action outcomes and repeat paid engagement | [#271](https://github.com/PlaybookMediaLLC/relay/issues/271), [#272](https://github.com/PlaybookMediaLLC/relay/issues/272) |
| **M16 — Qualified demand and business evidence** | Founder-approved event definitions, source coverage and a ledger that distinguishes shipped work, exposure, qualified conversions and economics | [#273](https://github.com/PlaybookMediaLLC/relay/issues/273), [#274](https://github.com/PlaybookMediaLLC/relay/issues/274) |
| **M17 — Higher-value programs and retention** | Test recurring offer tiers, upgrade triggers, true ARR, revenue retention, service cost and account expansion | [#275](https://github.com/PlaybookMediaLLC/relay/issues/275), [#276](https://github.com/PlaybookMediaLLC/relay/issues/276) |
| **M18 — Selective channel orchestration** | One permissioned acquisition handoff requested by paying customers, using specialized tools instead of recreating them | [#277](https://github.com/PlaybookMediaLLC/relay/issues/277), [#278](https://github.com/PlaybookMediaLLC/relay/issues/278) |

**Delivery order:** M13 first value and M7 paid discovery happen in parallel. M15 and the minimum M16 measurement contract support useful repeated work. M17 tests whether real accounts pay and expand at sustainable margins. M18 is gated on that evidence and is not an instruction to automate every marketing channel.

## Measurement and what a successful result means

Relay must show **three separate clocks**:

- **Delivery:** What exact source file changed? Who approved the proposal? Was the PR merged? Was the change observed live? Was the original technical postcondition verified?
- **Acquisition:** What do relevant search impressions, clicks, conversions or AI-search observations say later? Which measurements are absent, incomplete or affected by seasonality and other changes?
- **Business value:** Did the founder save time, return for another useful workflow, pay for the job, and renew? Did qualified visits or trials change in a way the available evidence actually supports?

The existing [Experiments and Results](docs/EXPERIMENTS.md) workflow uses a 28-day Search Console baseline, a seven-day exclusion period, and a 28-day observation window after a human-confirmed production deployment, with data sufficiency and finality restrictions. Its documented controls are **manual**, including tracking registration, merge-status refresh, deployment confirmation and measurement refresh. Any new scheduled automation must preserve these boundaries until independently tested.

The proposed **primary product north star** is **weekly paying acquisition programs with a meaningful, evidence-backed decision cycle**. Count a paid, authorized program once per week when sources are usable and an owner reviews or advances legitimate work or explicitly accepts a justified no-action result. An unattended report is insufficient. **Monthly paying workspaces with an independently verified acquisition-related production change** remains an important companion delivery metric, but must not incentivize pointless edits. Pair these with qualified acquisition behavior when the source and consent are reliable, false recommendations, required founder attention, actual cost, retention and expansion.

A founder with no defensible action can still receive an accurate report and retain a valid **no action** state. We will not encourage low-value edits to increase activity metrics.

## How software founders would discover and buy Relay

**Marketing execution:** [M19 — Founder Marketing & Qualified Distribution](https://github.com/PlaybookMediaLLC/relay/milestone/19) owns founder positioning, the developer-utility entry channel, real product demonstrations, community conversations, funnel measurement and a sustainable content cadence. See the [Relay Marketing Plan](docs/maintainers/RELAY-MARKETING-PLAN.md) and its [six issues](https://github.com/PlaybookMediaLLC/relay/milestone/19). M17 remains the commercial owner for pricing, retention, CAC and payback.



The $100M+ ARR ambition requires an efficient path from a developer or founder encountering Relay to paying for **recurring acquisition work**, not a large inventory of free SEO accounts.

**Initial channel hypotheses:** a useful result from the public [Relay SEO Check GitHub Action](https://github.com/PlaybookMediaLLC/relay-seo-check); evidence-led founder walkthroughs showing a real approved website change and production check; and narrowly targeted conversations with software founders who have a specific ongoing acquisition problem. None is assumed to have proven scalable distribution.

Track the distinct stages **qualified arrival → website/source authorization → first useful decision → approved technical completion where supported → payment for Grow or Protect → second meaningful review cycle → renewal/expansion**. A research-credit purchase, an installed action, a report view and an actual recurring paid acquisition program are different events.

A disciplined business measures acquisition cost including attributable human acquisition assistance, gross-profit contribution per program after provider and routine support costs, payback, retained ARR and expansion. The aim is to find one repeatable distribution motion before expanding channels or adding enterprise-looking infrastructure.

[Read the founder acquisition and distribution plan](docs/maintainers/FOUNDER-ACQUISITION-DISTRIBUTION.md) · [M17 pricing and economics](https://github.com/PlaybookMediaLLC/relay/milestone/17) · [Distribution validation issue #280](https://github.com/PlaybookMediaLLC/relay/issues/280).

## Hosted plans and usage

The current [hosted research service](https://relay.playbookmedia.io) documents a free tier with $1 in monthly credits and a $10/month Base Plan with $10 in monthly credits, plus top-ups. DataForSEO and some AI calls consume metered credits. These are **research-plan terms, not priced or validated subscriptions for Grow or Protect**.

Grow and Protect are separate paid hypotheses, not launched subscriptions. For planning, test bounded founder acquisition programs around **$199–$499/month**, recurring higher-capacity growth programs around **$750–$2,500/month**, and larger **$3,000–$8,000+** contracts only when founder-led businesses demonstrate the value, review capacity, service reliability and willingness to pay. **These are unvalidated price-test ranges, not published pricing or current entitlements.** Track actual ARR, retention, expansion and gross margin including provider and routine support costs. No Sync/Launch subscription is promised. Self-hosters supply provider credentials and infrastructure resources. See [DataForSEO key setup](docs/DATAFORSEO_API_KEY.md).

## How the application is organized

Relay is a TypeScript web application built on an OpenSEO foundation with Relay-specific seams. New backend work should reuse the existing **TanStack server function → feature service → repository** pattern, rather than introduce a second growth engine that duplicates data, authorization and provider calls.

| Area | Existing source owner | Responsibility |
| --- | --- | --- |
| Product UI | src/client/features/ and src/client/components/ | Pages, work queues, proposals, review states and accessible interactions |
| API and authenticated boundaries | src/serverFunctions/ and existing server authentication helpers | Request validation, organization/project identity, role checks and safe commands |
| Domain services | src/server/features/ | SEO opportunities, publishing, experiments, monitoring and supported orchestration |
| Data access | src/db/ and feature repositories | Project-filtered records, audit history, migration parity for SQLite/D1 and PostgreSQL |
| Providers | src/server/lib/ and established integration services | Search Console, GA4, DataForSEO, GitHub and other scoped data sources |
| Scheduled work | src/server/workflows/ and existing growth scheduling | Bounded checks, retries, provider spend and notifications |
| Agent access | src/server/mcp/ and plugins/openseo/ | Research and supported read/draft workflows using the same authentication and limits |

The first growth implementation should link **site context → evidence-backed opportunity → reviewed proposal → exact approval → GitHub PR → production check → outcome observation**. Reuse the existing records and behavior before adding database tables. Review [AGENTS.md](AGENTS.md) and [repository guidelines](docs/maintainers/review-guidelines.md) before changing code, especially upstream-owned modules and migrations.

### Permissions and production safety

- Read-only research is distinct from repository write authority. Explicit approval of a specific proposed diff is required before the supported publishing path creates a branch/PR.
- The customer keeps merge, CI, deployment and rollback control. Agents do not inherit repository write/approval authority simply because they can query Relay's MCP server.
- Dynamic routes, unsupported source syntax, conflicting product claims or stale base commits must be refused or returned for review. No arbitrary generated code is silently published.
- Provider credentials remain bound to the correct project/installation. Multi-tenant access, revoked permissions, spend admission, bounded crawling and audit records must be tested.
- A passing build, a successful GitHub API call, a merged PR, a deployed page and a conversion increase are **five different assertions**. The product must never collapse them into one success state.

### Upstream sync and forking

Relay is maintained as an MIT-licensed derivative of [every-app/open-seo](https://github.com/every-app/open-seo), outside its fork network. Preserve upstream copyright and license notices. Existing upstream-sync workflows should bring reviewed security fixes and research improvements without overwriting Relay's founder-growth choices. When a feature needs a fork-specific change, keep it narrow and review the upstream rebase/merge impact.

## Self-hosting

**Important for Relay self-hosters:** the guides linked below were inherited from OpenSEO and may still refer to the upstream source repository, upstream container images and OpenSEO branding. For example, the standalone Docker guide currently pulls an upstream OpenSEO image, which **does not automatically include Relay's Playbook-specific development changes**. Check your intended commit, image and configured providers before describing an instance as a Relay deployment.

For local Relay development, clone **this** repository and use [Local Development](docs/LOCAL_DEVELOPMENT.md). For a Relay-specific hosted or self-hosted release, build and deploy the reviewed Relay code with its matching migrations and provider credentials; use the upstream Docker/Cloudflare instructions only as infrastructure references until the Relay artifact and initialization path are validated.

Relay supports two self-hosting paths. Both use email and password accounts: the first visitor creates the admin account, teammates join from invitation links, and MCP clients (Claude, ChatGPT, Codex, Cursor) sign in with the same accounts.

- **Docker** - On your own server or computer, with a prebuilt image that is ready in seconds. Works with Compose-based platforms such as Coolify, Portainer and Dokploy. See [`docs/SELF_HOSTING_DOCKER.md`](./docs/SELF_HOSTING_DOCKER.md).
  - Running the older single-container image? It keeps getting updates; [move to the new setup](./docs/SELF_HOSTING_DOCKER.md#move-from-the-old-docker-image) when you are ready, data included.
- **Cloudflare** - No server to run: one deploy command puts Relay on your own Cloudflare account (works on the free plan). See [`docs/SELF_HOSTING_CLOUDFLARE.md`](./docs/SELF_HOSTING_CLOUDFLARE.md).

For security-conscious setups, two advanced options replace the accounts with your own network controls:

- **Cloudflare Access** in front of the Cloudflare deploy, so Cloudflare checks every request before it reaches Relay. See [`docs/SELF_HOSTING_CLOUDFLARE.md`](./docs/SELF_HOSTING_CLOUDFLARE.md).
- **No sign-in on Docker**, behind Tailscale, a private network or your own authenticating proxy. See [Without sign-in](./docs/SELF_HOSTING_DOCKER.md#without-sign-in-advanced).

Self-hosted feature availability depends on configured integrations, credentials and deployment bindings. See [Local Postgres](docs/LOCAL_POSTGRES.md) for the optional database backend; D1/SQLite remains supported. Review the hosting guides before exposing an instance to the public internet.

## MCP and agent skills

The inherited MCP server and skills expose SEO research and supported growth workflows to agents. Growth tools can read evidence and draft within their permissions; they do not grant approval, merge, or deployment authority. Broader change-impact APIs, event subscriptions and generalized Product Reality Engine tools remain optional proposals; the founder growth workflow and existing safe research endpoints take priority.

The [bundled MCP configuration](plugins/openseo/.mcp.json) points to `https://relay.playbookmedia.io/mcp`. Plugin branding and parts of the [plugin README](plugins/openseo/README.md) still use OpenSEO. The [upstream MCP setup guide](https://openseo.so/docs/mcp) explains client setup; use the Relay endpoint above, or your self-hosted endpoint and its supported authentication.

## Contributing to the right problem

The best contributions are grounded in a reproducible founder acquisition problem or a reliability issue that blocks supported website work. Open an issue that identifies the existing source evidence, affected page and deployment, relevant user action, limitation, expected behavior, and how the result can be independently verified. Avoid creating a new detector or integration merely to increase coverage counts.

**Before writing code:** inspect current functionality, the closest feature's callers and tests, the inherited OpenSEO counterpart, the [growth milestones](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md), and the specific source RFC where relevant. Reuse an existing service or component first. For significant changes, state the supported file types, auth scope, estimated provider cost, failure path and dual-database impact.

**Definition of a finished feature:** a real owner can complete the intended interaction on a supported site; tests cover success and refusal cases; permission/tenant and spend invariants hold; the user sees the correct state when proof is missing; and any deployment/measurement claims match the evidence collected. Changes to documentation alone never establish the production outcome.

## Development and contributing

Follow [Local Development](docs/LOCAL_DEVELOPMENT.md) for Node, the pinned pnpm version, environment configuration, and local database migrations. Common commands after setup:

```sh
pnpm dev
pnpm test
pnpm types:check
pnpm format:check
```

Read [AGENTS.md](AGENTS.md), the [contribution guide](docs/CONTRIBUTING.md), and the [maintainer documentation](docs/maintainers/README.md). Start with the [growth execution roadmap](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md). Use the [IRFC implementation queue](docs/maintainers/rfcs/implementation/README.md) as a source of scoped engineering contracts, not an unconditional mandate to implement the old platform sequence. The [historical RFC index](docs/maintainers/rfcs/README.md) preserves the detailed specifications, earlier engineering decisions, and live-acceptance caveats.

Retain upstream attribution and Playbook UI seams when integrating reviewed source improvements. GitHub detachment does not disable the existing upstream-sync workflow. See [LICENSE](LICENSE) for the MIT license and upstream copyright. The shared app theme adapts [Kaneo's CSS](https://github.com/PlaybookMediaLLC/kaneo/blob/develop/apps/web/src/index.css), with its [MIT notice](src/client/styles/kaneo.LICENSE).
