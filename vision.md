# Relay — growth execution for independent software founders

**Direction adopted:** November 7, 2026  
**Status:** Product thesis and evidence-gated roadmap, not a claim that every workflow ships today.

**Relay helps independent software founders turn observable customer demand into approved website improvements and measurable acquisition learning.**

A founder has limited engineering time and little or no dedicated growth team. Research tools can identify interesting queries and competitors, but they often stop before a useful change reaches the founder's actual website. Content tools can produce material without understanding whether it is accurate, worth publishing, or effective. Relay's job is the accountable work between the opportunity and the outcome: decide what is worth doing, prepare a constrained change in the customer's existing codebase, obtain approval, verify production, and learn from later evidence.

The initial emphasis is **organic discovery, AI-search visibility where evidence exists, high-intent website pages, and acquisition conversion**. Protecting those pages from regressions is an important supporting workflow, not the definition of the whole company. Relay does not aim to become a generic product-operations suite, launch-communications platform, or every-channel marketing agent.

## Who this is for

**First customer hypothesis:** an independent founder building a software product who controls a GitHub-managed website, wants more qualified inbound demand, has little specialist SEO capacity, and can approve source changes. Next.js is the first supported change target because Relay already has a narrow, tested publisher; other stacks require separately validated adapters.

The founder may have established Search Console history or may have just launched. These are different evidence situations. New sites should receive useful public-site diagnostics and clearly limited research rather than fabricated rankings, conversions, or forecasts. Established sites can use query/page performance and measured conversion signals to prioritize.

The buyer, reviewer and operator may be one person. Do not design an enterprise approval hierarchy into the default experience. Explicit source authority remains necessary even for a solo founder.

**Commercial hypothesis to test:** the founder will pay repeatedly for a reliable, constrained growth-workflow service that actually helps them ship better acquisition assets. Research-only usage, dashboard visits and demo praise do not validate it.

## The north-star experience

A founder connects a website, GitHub repository, Search Console and, when available and consented, GA4 or a defined conversion event. They tell Relay who the product is for and which conversions matter. Relay can then answer:

1. Where is there credible, commercially relevant demand that this website is failing to capture?
2. Which existing page, missing answer, broken acquisition path, or technical regression merits action now? What evidence is missing?
3. What is the smallest supported change worth making, what is the risk, and what would count as technical completion?
4. What exact source change is proposed, who approves it, and did it actually reach production?
5. What did search, AI visibility, signup, or customer-acquisition observations do afterward? Can we tell whether anything improved, or is the result inconclusive?
6. Which action, if any, deserves the founder's next limited hour, given previous decisions, costs and results?

The product loop is:

**connect → understand the business → observe demand → prioritize work → prepare → approve → deploy through the customer's process → independently verify → observe outcomes → retain learning.**

Every stage must return useful facts or an honest no-action result. An agent may help investigate and draft, but the founder can complete supported workflows through ordinary product controls without relying on a chat agent.

## The first repeatable job

Start with one **existing high-intent page**. Using authentic Search Console and page evidence where available, Relay identifies a query/page mismatch, weak snippet, missing internal link, content gap, or supported technical issue. It proposes the narrowest credible correction.

The founder reviews the reasons and exact diff. Relay creates a pull request through the existing GitHub approval process. Customer-owned CI, review, merge and deployment stay in place. Relay then verifies the live destination reflects the intended technical change and registers a follow-up observation using existing Search Console and GA4 mechanics when the data supports it.

**Technical verification and marketing performance are separate results.** A live page containing the approved metadata is a verified technical change; a later rise in impressions, clicks, trials or revenue is an observational result, not proof the change caused that rise.

A valuable first run can also conclude that there is insufficient query history, that the source cannot be mapped safely, or that none of the available changes are justified. Relay should not manufacture work to improve engagement.

This flow should not wait for every historic Protect/Sync IRFC to finish. Reuse the already implemented opportunities, AI-assisted investigation, narrow publishing, experiments, site checks, jobs and spend controls. Extend those systems only to close a verified gap.

## Capability priorities

| Work | What Relay should do | Investment rule |
| --- | --- | --- |
| Commercial search demand | Use existing keyword research, Search Console, rankings, competitor evidence and page audit signals to identify actionable opportunities | **Core now:** prioritize relevance, data quality and work completion over new detector count |
| GitHub-native website improvements | Produce exact, reviewable metadata, selected copy or documentation changes; supported link and factual page edits only after safe adapters exist | **Core now:** one real approved, production-verified improvement |
| Measurement and page memory | Preserve source/approval/deployment receipts, GSC/GA4 observations, uncertainties, previous attempts and cooldowns | **Core now:** do not call before/after movement causal |
| Protect | Monitor important acquisition pages, catch real regressions, prepare supported repairs and independently verify | **Reuse and test as a separate paid offer:** do not make all of Protect a prerequisite for the first growth change |
| Conversion integrity | Detect broken critical signup/demo paths and missing conversion measurement where consented, using non-mutating checks | **Selective early expansion:** no live purchase or outreach side effects |
| AI-search discovery | Observe relevant prompts, mentions/citations and resulting website opportunities where providers can supply reproducible evidence | **Bounded experiment:** no guarantee of model citations or stable rankings |
| Content and decay recovery | Improve existing pages, enforce history/cooldowns, and eventually create one sourced new page at a time | **After repeat demand:** no content farm or unlimited generative output |
| Product-claim truth | Prevent generated or edited website claims about plans, integrations and product features from being unsupported | **Guardrail now; broad cross-system fact graph deferred** |
| API/MCP | Expose small authorized research, opportunity, review and evidence-reading workflows to coding agents | **Reuse existing MCP; additional platform work only for an active customer task** |

### What the existing code already supplies

Relay is a distinct MIT-licensed derivative of [OpenSEO](https://github.com/every-app/open-seo), retaining upstream attribution and reviewed update flows. It already includes keyword and competitive research, AI visibility, site audits, Search Console and GA4, opportunity detection, ranking and backlinks, GitHub source access and narrowly approved proposals, experiments, revenue attribution, jobs, permissions, spending controls and work reports.

Those are **implementation foundations**, not proof of reliable live execution for every supported provider, measurable acquisition gains, or willingness to pay. [The dated implementation audit](docs/maintainers/relay-release-assurance-audit.md) and [RFC index](docs/maintainers/rfcs/README.md) retain their original evidence and caveats.

Protect's durable known-good production baselines, confirmed incidents and original-rule repair verification have their own acceptance gates. Preserve that work. Do not reimplement closed historical RFCs to satisfy a new milestone label.

## How Relay fits within Playbook Media

Playbook Media's products should help an independent founder compete without recreating the staffing and tool burden of a larger company. They can interoperate without merging their products or customers into one mandatory workflow.

| Product | Primary responsibility | Boundary Relay must keep |
| --- | --- | --- |
| **Relay** | Identify organic/AI discovery opportunities, improve acquisition pages safely, protect important traffic paths, and measure observed outcomes | Own website growth decisions and verified web changes, not every marketing channel |
| **Shots** | Produce product visuals, role-specific release kits, announcements, brand assets and social distribution | Shots owns release communication and creative production; Relay may request visuals or use approved links, not rebuild Launch |
| **Verify and Warmbly** | Find and validate outbound prospects and operate consented outbound campaigns | Relay does not build a contact database, cold-email engine, or general CRM |
| **Playbook Operator** | Potentially coordinate founder work across specialized products | Relay provides bounded API/MCP operations and does not become a general agent supervisor |

A new integration release may be a **website growth opportunity** for Relay and a **release-communication opportunity** for Shots. They can exchange permitted facts or artifacts through small versioned interfaces if a real workflow warrants it. The fact that both can read GitHub does not justify two full release-orchestration systems.

## Product architecture: build the smallest useful execution loop

Reuse the existing domain and access boundaries. The minimum durable record links:

`workspace/site → evidence-backed opportunity → decision → exact proposed website edit → approval → source PR → observed deployment → live technical verification → later measurement → next decision`.

Record source and collection time, organization/site identity, provider costs, URL, evidence revision, confidence/unknown state, reviewer and change revision. Keep separate clocks for source changes, actual deployment, indexing/analytics availability and conversion observation.

Do **not** require a complete Product Reality Engine, generalized fact graph, CRM connector platform, external publishing adapters or an omnichannel execution bus before demonstrating this loop. Existing product-fact verification is a narrow safety check for claims made in a proposed website edit. Broader Sync and cross-system claim reconciliation are separate hypotheses whose RFCs remain available but **are not approved as the next automatic build sequence**.

Maintain:
- Tenant and project isolation, least-privilege source connections and explicit consent.
- Exact-change approval and current-source checks; no silent auto-merge, deployment, billing change, customer message or marketing send.
- Safe parsing and refusal paths for dynamic/ambiguous source, unsupported frameworks and unverified product claims.
- Cost admission and budgets for DataForSEO, AI models, page rendering and third-party observations.
- Reproducible production checks, audit history and truthful failed/inconclusive statuses.
- Secure small interfaces for external agents. No shared generic write tool with all connected credentials.

## Commercial validation

Test **Grow** and **Protect** as two separate paid-wedge hypotheses among independent software founders instead of preselecting a different customer segment to justify the code:

- **Grow:** actionable high-intent demand → owner-approved website edit → observed production change → later measured acquisition signals.
- **Protect:** selected acquisition pages with agreed monitoring cadence → confirmed regression → owner-approved repair → original problem resolved on production.

Record actual paid commitments, owner review friction, authorized source access, onboarding time, repeated completion, false findings, provider/model costs, human support effort, retention and requests the existing tools already satisfy. Internal Playbook sites are useful for engineering rehearsal, but internal usage is not proof of external willingness to pay. A founder should be able to refuse a suggested edit without losing the value of the investigation.

No price range, growth outcome, customer count or onboarding speed is promised until measured. The founder chooses the repeatable, economic workflow; the unproven offer may be narrowed to a feature or paused.

## Measuring the north star

**Primary proposed product metric:** monthly paying independent-founder workspaces with at least one **approved acquisition-related website change independently verified live** in the previous 30 days. Count a workspace once per period; retries, additional generated drafts, unmerged PRs and variant outputs do not add completions. A technical change reaching production is not automatically an SEO improvement.

Report alongside it:
- **Funnel:** connected and authorized founders → evidence-backed opportunities reviewed → approved source changes → production-verified changes → results eligible for observation.
- **Founder value:** time and money required for each verified change; retention, repeat approved work and willingness to pay.
- **Business outcomes, separately:** qualified organic visitors, meaningful signups/trials, activated users and paid conversions where instrumented and consented. Use comparable windows and label uncertainty, missingness, channel mix, seasonality and noncausal before/after results.
- **Reliability guardrails:** bad recommendation/false positive rate, blocked and stale approvals, source/tenant safety, monitoring coverage, deployment verification failures and provider spend.

Quiet or low-data periods remain honest no-action/insufficient-evidence states; do not manufacture changes to maximize the metric. Track those workspaces separately as retained customers rather than pretending a change was shipped.

## Roadmap, not release promises

[GitHub milestones](https://github.com/PlaybookMediaLLC/relay/milestones) and the [founder-growth execution roadmap](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md) describe the current investment order. Historic technical [IRFC-0001–0032](docs/maintainers/rfcs/implementation/README.md) are source specifications and acceptance contracts, **not an unconditional instruction to build the old Protect → Product Reality Engine → Sync → Launch plan in full**.

1. **First founder value:** M13 Growth v1 integrates existing opportunity research, M1/M2/M3 evidence/edit/verification capabilities and minimal onboarding. Run M7 independent-founder paid pilot discovery in parallel.
2. **Reliable repetition:** M5 gives the founder an accountable work history; promote the narrow M10 page-memory and existing-page improvement slices where they prevent repeated ineffective work.
3. **Acquisition reliability:** complete useful M1–M3 Protect slices and test Grow versus Protect commercially. Promote bounded M9 conversion/journey checks only for a demonstrated acquisition failure.
4. **Better discovery:** M14 tests whether source-backed AI-search visibility yields actionable, paid growth work. Prioritize observation quality over prompt volume.
5. **Only after demand:** evaluate selective additional publishing adapters and narrowly scoped M4 product-claim checks; M6 generalized PRE, M8 Relay-owned launch packets, M11 organizational coordination and M12 capital-intensive automation are deferred unless an independent paid use case changes the decision.

**Practical next test:** use a real Playbook GitHub-managed website to prove one search opportunity → reviewed website change → customer-owned deploy → verified live page → honest subsequent observation. Then validate the same workflow with paying independent founders. Fix the broken part of that loop before adding another large module.

The north star is progress toward qualified acquisition that a founder can understand and act on, **not the number of integrations, automated messages, generated pages, or configured monitoring jobs**.
