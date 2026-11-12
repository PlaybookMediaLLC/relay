# Relay — growth execution for independent software founders

**Direction adopted:** November 7, 2026  
**Status:** Product thesis and evidence-gated roadmap, not a claim that every workflow ships today.

**Relay helps independent software founders build a repeatable customer-acquisition operation: discover real demand, execute approved improvements, and learn from independently verified delivery and qualified customer outcomes.**

A founder has limited engineering time and little or no dedicated growth team. Research tools can identify interesting queries and competitors, but they often stop before a useful change reaches the founder's actual website. Content tools can produce material without understanding whether it is accurate, worth publishing, or effective. Relay's job is the accountable work between the opportunity and the outcome: decide what is worth doing, prepare a constrained change in the customer's existing codebase, obtain approval, verify production, and learn from later evidence.

The initial emphasis is **organic discovery, AI-search visibility where evidence exists, high-intent website pages, and acquisition conversion**. Protecting those pages from regressions is an important supporting workflow, not the definition of the whole company. Relay does not aim to become a generic product-operations suite, launch-communications platform, or every-channel marketing agent.

## The company we intend to build

**The ambition is a $100M+ ARR-capable customer-acquisition execution business, not a permanent $99/month SEO utility.** That is a direction against which to make product and commercial decisions, **not** a revenue forecast, a claim of current demand or permission to build every channel at once.

Landing with independent software founders is an advantage: the person experiencing the acquisition problem can often authorize the source change and judge the result. But the account must become more valuable as that founder's software business grows. Relay should earn continuing responsibility for selecting, completing and learning from **recurring acquisition work**. It should eventually be possible for the same customer to use Relay when they have multiple products, important acquisition funnels, a few teammates and a larger acquisition budget. The original founder remains a credible entry customer; product design must not assume a marketing department or an enterprise implementation team on day one.

The distinction between today's product and the intended business is substantive:

| Dimension | First useful product | Larger recurring business |
| --- | --- | --- |
| **Commercial job** | Turn one credible search opportunity into an approved, live website improvement | Manage a bounded ongoing acquisition program: choose the next work, carry it through approved destinations and evaluate the resulting evidence |
| **Use pattern** | Occasional research and individual PRs | Weekly decisions, approved improvements, protected customer paths, measurement, correction and memory across cycles, including valid no-action weeks |
| **Revenue relationship** | Low-cost research plan or small site subscription | Higher-value recurring programs with agreed scope, volume, reliability and cost limits; accounts expand as their acquisition needs grow |
| **Proof of value** | Verified source change and later search observations | Distinct records of what shipped, relevant demand/exposure, qualified customer behavior and observed economic outcomes with explicit attribution limitations |
| **Product breadth** | GitHub-managed web pages, Search Console, selected AI visibility and GA4 | Gradual addition of reliable acquisition workflows and permissioned channel handoffs when paid customer demand warrants them |

**The central unit of account is a paid acquisition program.** A program specifies the software product and audience, acquisition goals, a site or approved destination, a review cadence, connected evidence, allowed work and costs, owner, verification checks and reporting commitments. A program is not an autonomous marketing agent with a universal write token. It works through the customer's approved tools, and it may legitimately recommend no changes during a quiet week.

Relay's prospective long-term advantage lies in the customer-specific record of accepted and rejected actions, precise approvals, verified publication, observed commercial signals and the founder's time and provider costs. A repository edit and a generic model summary are easy to reproduce; recurring, trusted execution with reliable context may be harder. That is a hypothesis to test through actual retention, expansion and support economics.

**Four requirements determine whether this becomes a large company:**

1. **Broader commercial responsibility:** graduate from technical SEO changes to qualified acquisition programs covering commercially important pages, selected conversion journeys, AI visibility research and appropriate other channels. Expand what Relay owns only when it can complete and verify the work.
2. **Repeat engagement:** make the weekly review/approval/outcome cycle useful when no new product release occurred and when no edit is warranted. Track genuine founder decisions rather than scheduled task runs or content quotas.
3. **Larger contracts:** support a founder-led company as its stakes, page groups, products and reporting requirements grow, with clearly bounded service and permission terms. Higher ACV has to be earned through delivered value and operating reliability.
4. **Defensible outcome accounting:** separate verified technical changes from observed discovery, qualified conversion behavior and economic results. Neither a shipped PR nor first-touch attribution proves incremental acquired revenue.

The detailed [acquisition company-scale plan](docs/maintainers/ACQUISITION-EXECUTION-SCALE-PLAN.md) specifies the account progression, program contract, four evidence clocks, proposed pricing tests, unit economics, milestone gates and stop conditions.

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

## The problem worth owning

For an independent founder, organic acquisition is fragmented between research, judgment, engineering, publishing and measurement. A keyword tool produces lists. Search Console shows pages losing impressions or attracting the wrong queries. A coding assistant can edit a file, but often lacks the site's search history, the business context and the approval history. A founder is left deciding which report matters, explaining the change, testing it, reviewing the pull request, shipping it and remembering what happened a month later.

Relay should earn its place by **reducing the work required to complete a good acquisition decision**, not by accumulating more reports. In its first version it must demonstrate that a particular recommendation was worth a founder's attention, was actually safe to implement, and reached the intended live destination. Whether the business result improves is a separate, slower hypothesis.

### The founder profiles to test

| Profile | Existing evidence | Immediate job | First useful response |
| --- | --- | --- | --- |
| **Newly launched software founder** | Public site, GitHub code, few or no Search Console impressions | Make the product discoverable and avoid basic technical errors | Site/indexability findings, a limited set of relevant queries with source and cost, and an honest statement that traffic-based prioritization is unavailable |
| **Founder with early inbound traffic** | Search Console query/page history, a few important landing pages, some signups | Find one high-intent page worth improving without spending weeks on SEO | A ranked shortlist grounded in actual queries, page intent and a supported edit; weak signals shown as uncertainty |
| **Founder with material existing acquisition** | Search Console, GA4 or consented conversion events, frequent site releases | Improve qualified traffic while avoiding harmful regressions | Evidence-backed opportunity or confirmed technical incident, an approved correction and production/measurement receipts |

These are **hypotheses for interviews**, not proven market segments. Do not assume a founder knows SEO vocabulary, has a staff reviewer, can grant a new GitHub App installation, or has enough data for a meaningful experiment. The product must be useful with narrow permissions and must explain why an unsupported or unconnected step cannot continue.

### What Relay is hired to complete

- **Decide:** help the founder select the most defensible next website improvement instead of reviewing twenty unrelated dashboards.
- **Implement:** perform the tedious but bounded source analysis and proposal preparation, using their existing repository and approval rules.
- **Check:** independently establish whether the intended technical change reached production. An accepted suggestion, merged PR and live fix are different states.
- **Remember:** preserve what was tried, what was rejected, what it cost, and what later observations do or do not say, so the next recommendation is informed by history.

Relay is **not** hired to manufacture content, promise search rankings, replace a founder's development process, or run all their marketing channels. A self-contained read-only finding or useful ticket must be an acceptable result when an edit cannot be proven safe.

### A specific product example

*Illustrative, not a claim about any real customer's results.* A founder selling invoicing software already has a page that appears in Search Console for a commercially relevant query, but its current copy answers a different question. Relay should show the actual query and URL, trend and data period, the intent mismatch and the particular page section it can support changing. It may suggest a narrow, source-backed copy correction. If the source is dynamic or the proposed claim cannot be verified, it stops at a reviewable ticket rather than generating a risky change.

If the founder approves a safe diff, Relay creates a PR. When the founder's release process publishes it, Relay checks that the intended content is live. Search clicks and downstream trials may take weeks to evaluate and may change for other reasons. The product should show all three facts separately: **the work was approved; the change was published; commercial impact is not yet established**.

A founder with no Search Console history should receive a different result: indexability and page-quality checks, a constrained public-data investigation, and a clear explanation that a statistically credible traffic opportunity has not yet been demonstrated.

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

## Work selection: from noisy signals to a defensible recommendation

The opportunity pipeline must distinguish **a finding**, **a plausible hypothesis**, **a supported proposed action** and **a verified shipped action**. Combining them into one generic confidence score would conceal the very decisions a solo founder needs to make.

### Evidence and confidence

| Evidence class | Can support | Cannot establish by itself |
| --- | --- | --- |
| First-party Search Console query/page/time data | Actual indexed search appearances, clicks, impressions, CTR and position observations within Search Console's limits | Buyer intent, conversion causality, or a guaranteed future ranking |
| Consented GA4 / explicitly defined conversion events | Observed on-site behavior and qualifying conversion counts where tagging and coverage are sound | Whether an SEO edit caused a signup, or whether all users were tracked |
| DataForSEO SERP/keyword/backlink research | A paid external view of demand and competition at a stated location, device and retrieval time | The website's actual traffic, the founder's buyer fit, or a complete competitive picture |
| Technical site/CI checks | A reproducible response, indexability, metadata, redirect, rendering or supported accessibility/performance finding | Which commit caused it or its financial effect |
| AI-search prompt/answer/citation samples | A specific model/provider response under repeatable prompts and observation conditions | Stable model preference, full market visibility, or the ability to force a citation |
| Founder-supplied product facts | What the founder says is currently available and to whom, subject to review | Live feature availability to every account, region or rollout cohort without further proof |

Each recommended work item should make these fields inspectable: **source, property and page identity, query or rule, collection time and window, segmentation, baseline, observed value, evidence quality, the founder's audience, intended user action, proposed site change, expected technical postcondition, cost/effort, risk, permissions and missing facts**.

Stale, absent or contradicted evidence should degrade the recommendation rather than be silently replaced by model-generated certainty. A language model may explain the evidence or draft a bounded change; it does not make the evidence authoritative.

### Prioritization rather than a magic score

Start with explicit gates before attempting numerical ranking:

1. **Relevance:** Is this query or page tied to a problem the product actually solves and a customer the founder wants?
2. **Opportunity:** Is there a specific, sufficiently supported mismatch or technical problem? Distinguish new-site diagnostics from established-site Search Console opportunities.
3. **Actionability:** Is the correction within a supported repository, page type and safe-edit class? Is owner review available?
4. **Downside:** Could the edit introduce false claims, break a conversion path, replace another experiment, or affect a high-value page without reliable verification?
5. **Cost and timing:** How much founder review, engineering time, third-party spend and measurement delay are involved?

Only compare eligible recommendations after those gates. The UI can rank by expected business relevance, evidence strength, urgency and cost, but it must show the reason and allow manual reordering. Avoid invented dollar-impact estimates from keyword volume multiplied by an assumed conversion rate. When exact business impact is unknown, say so.

### Work classes and their first safe boundary

| Class | First supported action | Higher-risk extension |
| --- | --- | --- |
| **Metadata and search snippet** | Review an existing literal title/description in a supported Next.js route, prepare exact diff and PR | Dynamic metadata, layout inheritance and broad templates without a source-to-render proof |
| **Page copy and documentation** | Reuse existing narrow text/Markdown mechanisms and verify source-backed claims | Unrestricted rewriting, multi-file copy generation, automated translation or hidden legal claims |
| **Indexability and technical regressions** | Reuse SEO rules and report exact status, noindex, canonical or redirect observations; repair only supported source-mapped types | Automatic edits to robots, headers, routing and complex infrastructure |
| **Internal links and content decay** | Diagnose candidate pages, show source/context, prepare one approved change after a safe adapter is validated | Bulk sitewide link insertion or autonomous content refresh |
| **New factual landing pages** | Recommend a page gap and show the source facts still needed | Create one reviewed page only after existing-page workflows and safe templates prove repeatable |
| **AI-search opportunity** | Collect repeatable relevant samples and suggest source-backed on-site work | Claiming a guaranteed model citation or editing external model answers |
| **Conversion and critical journeys** | Consented, safe read-only checks and alerts | Simulated signup or checkout that creates real customers, leads, charges or spam |

The first v1 release should not promise support for every row. Shipping a small, reliable title/description or existing-page copy edit is worth more than advertising arbitrary-code modification.

## Product experience: what the founder should see

### Start and onboarding

A founder should establish the product URL, intended buyer, meaningful conversion and site ownership in one short flow. Connect only the integrations necessary for the chosen job; show the actual permissions requested. A Search Console connection improves the evidence, but lacking it should not create a blank or falsely confident product. Offer a bounded read-only audit and a clear path to returning when search history exists.

Use **a sample observation labelled as an example** to explain the workflow, never invented activity in the founder's own account. Distinguish setup incomplete, authorization expired, no data yet and no actionable opportunity. A disconnected integration must not leave old data looking current.

### The weekly home

The default view is not a wall of metrics. It answers: **What is worth reviewing? What was shipped? What is awaiting someone else? What can we conclude?**

A useful home can have four areas built from existing components: current recommendations, approvals awaiting the founder, live changes awaiting verification or sufficient measurement data, and finished/no-action decisions. Each row shows a reason, evidence age, impact uncertainty and next action. Quiet weeks should show the coverage checked and honest lack of actionable findings, not fabricated suggestions.

### Opportunity detail and approval

The detail view displays the original source evidence and dated metric window, the relevant customer/search intent, existing page, proposed changed text, exact code target, risk, what the model inferred, and what is still unverified. The proposed change and its technical postcondition should be separable from a speculative traffic lift.

Approval has three distinct decisions: **approve the recommendation for preparation; approve the exact PR write; later merge/deploy through the customer's own controls**. No bulk approval should silently combine all three. A new file revision, claim conflict or expired permission invalidates the affected approval and displays the recovery path.

### History and learning

Every page's history should capture accepted and rejected suggestions, manual overrides, source revisions, PRs, successful and failed verification, measurement windows and the explanation for a cooldown. A model recommendation must not overrule a previous explicit founder refusal simply because it can rephrase the same suggestion.

A founder should be able to export or inspect what Relay has done and see which result is **confirmed**, **customer-attested**, **pending**, **unknown** or **inconclusive**. Avoid a composite green success badge that confuses a successful API call with an improved business outcome.

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

## Execution contract and failure semantics

The service that performs research and the service that requests a GitHub write must share project, user and authorization context, but they have different privileges. Read-only investigation should not require publish scope, and approval to prepare a proposal is not approval to write a branch.

### Minimum record chain

The first version needs stable references and existing compatible records for:

- **Site context:** organization/project, production origin, relevant repository connection, GSC property, founder-approved business description, important pages, currency/timezone if commercially relevant.
- **Observation:** provider and account, resource/query/URL, source timestamp, collection timestamp, period and dimensions, freshness, status, cost and immutable evidence link.
- **Opportunity:** source observation IDs, relevant page, diagnosis, reviewer decision, class/risk, version and deduplication key; no invented conversions or rankings.
- **Proposal:** supported adapter, exact repository/path/base SHA, original and proposed values, expected technical postcondition, claim provenance, immutable fingerprint, author and expiry/staleness state.
- **Execution:** authorization identity and exact fingerprint, idempotent branch/PR attempts, current GitHub revision, CI/preview evidence, checkpoint and failure state.
- **Verification:** source merge state, separately observed deployment or attestation, production URL/response and matched postcondition, verification timestamp, conflicting change, outcome and provenance.
- **Observation of results:** eligible Search Console/GA4 window, data completeness, direction, risks, and separate business-value assessment. This may remain pending well after technical success.

Reuse existing tables/services where these contracts are already satisfied. Do not invent a generic growth knowledge graph or duplicate the proposal, audit, measurement and review systems. SQLite and Postgres schema/migration parity, tenant-filtered queries, idempotence and credit admission remain non-negotiable.

### Work and authorization states

A recommendation can be **new → needs evidence → reviewed → proposal prepared → exact-write approved → PR opened → merged → deployment observed or attested → production verified**. A review can also end in **rejected, deferred, unsupported or no action**. Each state is event-backed, not guessed from a button click.

Keep an independent **measurement clock** after verification: not eligible → baseline available → exclusion/indexing period → observing → completed with encouraging, negative or inconclusive direction. An explicit **unknown** is mandatory when provider data or deployment evidence is missing. If GitHub reports a merge but the live page still contains the old value, technical verification has not passed. If another developer independently fixed the page, record it without claiming Relay's change was responsible.

The source remains the customer-controlled GitHub repository. Existing source mapping, proposal fingerprints, read/write grants, human approval, checks, recovery and audit pathways are the first implementation. Failure paths should be as visible as the successful path: revoked account, insufficient provider credits, expired source data, unsupported dynamic routes, competing PR, failed preview, unreconciled merge, stale production or a measurement window without enough data.

### Data minimization and operational cost

Do not fetch an entire private repository, CRM dataset or personal analytics history when a scoped file, aggregate query or narrow permission suffices. The first founder-growth release needs GitHub, Search Console and optionally GA4; a broad paid connector catalog is not a prerequisite. Never send secrets or a customer's source corpus to a model merely to generate a summary.

Before a paid investigation, show estimated provider use and check existing project/organization limits; charge and audit through the established spend ledger. Long-running monitors and retrying jobs must have explicit cadence, backoff and budgets. A failed scheduled run is **degraded coverage**, not evidence the site is healthy. The product must make its own operating cost visible before selling an unlimited-work subscription.

## Commercial validation

Test **Grow** and **Protect** as two separate paid-wedge hypotheses among independent software founders instead of preselecting a different customer segment to justify the code:

- **Grow:** actionable high-intent demand → owner-approved website edit → observed production change → later measured acquisition signals.
- **Protect:** selected acquisition pages with agreed monitoring cadence → confirmed regression → owner-approved repair → original problem resolved on production.

Record actual paid commitments, owner review friction, authorized source access, onboarding time, repeated completion, false findings, provider/model costs, human support effort, retention and requests the existing tools already satisfy. Internal Playbook sites are useful for engineering rehearsal, but internal usage is not proof of external willingness to pay. A founder should be able to refuse a suggested edit without losing the value of the investigation.

No price range, growth outcome, customer count or onboarding speed is promised until measured. The founder chooses the repeatable, economic workflow; the unproven offer may be narrowed to a feature or paused.

### Explicit buyer tests

Interview the founder about the last concrete acquisition decision, not whether they would like an AI growth agent. Reconstruct the sequence: what signal prompted the work, which query or page mattered, which alternative they considered, who implemented the change, how long it took, what broke, whether they measured it and what they would have paid to avoid the coordination cost.

Test both paid offers on a **bounded scope**. A Protect buyer may pay for reliable checks and repair readiness even when no work is necessary in a quiet week. A Grow buyer must see credible repeated opportunities and a low-friction implementation path; selling a fixed number of generated edits would create the wrong incentive. Each product should track distinct payment, cost, retention and outcome evidence.

### A credible pilot and stop conditions

**Engineering rehearsal:** use an authorized Playbook property to test source permissions, safe PR creation, deployment verification and honest analytics timing. Keep fixture results and internal use clearly separate from external demand.

**External design partner:** seek real independent-founder customers with an approved production site, a defined query or acquisition problem, a specific reviewer and a disclosed price/limit. Observe a full cycle. Record actual payment separately from verbal enthusiasm and record human troubleshooting as part of cost of delivery.

**Repeat decision:** ask whether the founder returned unprompted for another qualified recommendation, whether work reached production, whether later measurement was sufficient, and whether they renewed or paid again. If every customer must be hand-held, search recommendations are mostly low-value, sites are unsupported, or review takes longer than fixing the issue manually, shrink the offer rather than opening more platforms.

**Cost model to test:** revenue per paying workspace and accepted work cycle, provider/model and browser spend, deployment-verification requests, human support minutes, refund/failed-settlement exposure and acquisition effort. Gross margin excludes customer traffic gains; those are customer outcomes, not Relay revenue.

### How Relay could reach founders

The current [Relay SEO Check GitHub Action](https://github.com/PlaybookMediaLLC/relay-seo-check) can be a useful developer entry point. Founder-led demonstrations should show the real before/source diff/PR/live verification sequence, not a collage of prompt outputs. Publish case studies only with customer authorization and exact caveats. Self-hosting and MCP integrations make the product approachable for technically independent founders, but they do not by themselves establish a sustainable paid acquisition channel.

## Measuring the north star

**Proposed product north star: weekly paying acquisition programs with a completed evidence-backed decision cycle.** A program qualifies at most once per week when its source coverage is usable and an authorized founder/reviewer reviews the current work, advances a supported action, or explicitly accepts a reasoned no-action result. An unattended job, automatically generated report or fabricated suggestion is not a qualifying cycle.

**Companion delivery metric:** monthly paying founder workspaces with at least one approved acquisition-related website change independently verified live. It is an important measure of useful completed work, **not proof of more customers**, and it must not encourage unnecessary edits in quiet weeks.

### The four clocks of acquisition work

1. **Execution:** proposal, explicit approval, GitHub PR, verified merge, separately observed deployment and independently checked technical postcondition. This is the earliest result Relay can directly verify in the initial product.
2. **Exposure:** relevant first-party search impressions/clicks, observed AI-search prompt citations or consented acquisition-session information. All require their own source coverage and observation time.
3. **Qualified behavior:** meaningful, founder-defined trial, signup, demo or activation events, with reliable event semantics and awareness of missing or late data.
4. **Economic result:** customer acquisition, payments or qualified pipeline where a permitted, scoped billing/CRM source can support the fact. Do not equate an attribution label with incremental revenue.

Each layer can be verified, observed, insufficient, conflicted or unavailable independently. Describe before/after changes as observational; distinguish careful comparable-group analysis from a properly eligible controlled experiment. Never manufacture revenue uplift by combining keyword volume, an assumed conversion rate and an invented price.

The existing [Experiments and Results](docs/EXPERIMENTS.md) documents a 28-day Search Console baseline, seven-day exclusion and 28-day observation window; current deployment confirmation and refresh involve human actions. That contract is a foundation to reuse, not proof of automated causality detection. M16 will test defensible conversion definitions and an outcome ledger without replacing GA4, billing, analytics providers or the existing experiments system.

### Economics that keep the ambition accountable

Track **ARR, paying programs/accounts, ARPA/ACV, gross revenue retention, net revenue retention, expansion and contraction, gross margin including third-party provider/compute/routine human work, acquisition cost, payback and renewals**, alongside the product north star. Report small cohorts with actual account counts and dollars, not only impressive percentages.

For clarity, the $100M ARR ambition could arithmetically mean about **10,000 accounts averaging $833/month**, **5,000 accounts averaging $1,667/month**, or **2,000 averaging $4,167/month**. These are not market-size estimates or forecasts. They illustrate why the business cannot stop at a cheap research subscription.

Test a packaging ladder with founders: a limited, paid first program; a recurring program for revenue-generating software companies; and a larger bounded multi-program offering as those companies grow. The price hypotheses and upgrade criteria are in the [scale plan](docs/maintainers/ACQUISITION-EXECUTION-SCALE-PLAN.md). Do not change live billing plans or promise unlimited agent execution before paid evidence and provider economics support them.

Guardrails still include acquisition recommendation quality, coverage and freshness, safe approval rate, review time, cost per verified change, verified original failures, error/unknown reporting, retention and the percentage of programs that are only being kept active by artificial work.

## How Relay itself earns distribution

Building a recurring acquisition product does not prove Relay can acquire its own customers economically. The proposed route to $100M+ ARR also depends on a repeatable channel that reaches qualified founder-led software businesses, a short enough time to first useful decision, a credible transition to paid Grow/Protect programs, and retention without excessive manual support.

Start with **developer-trusted product entry** through the existing [Relay SEO Check GitHub Action](https://github.com/PlaybookMediaLLC/relay-seo-check) and **founder-led, source-backed demonstrations** of a real recommendation, approved PR, live verification, and honestly described later observations. These are hypotheses, not channels with proven paid conversion. Interview founders about the tools and workflows they currently pay for, and use actual purchase/permission behavior rather than free signups or impressions to decide where to invest.

The company should measure its own funnel: qualified founder arrival → authorized relevant workspace → first reviewed useful decision → supported completed website work where eligible → paid bounded acquisition program → repeat weekly use → renewal or justified expansion. A research-credit subscriber is not automatically a paying Grow customer. A low-data founder may receive a useful no-action decision but must not be counted as having shipped a verified change.

Channel-specific acquisition cost must include attributable sales/marketing spending **and acquisition-specific founder or staff time**. Payback should use gross-profit contribution after routine provider, compute, verification and support costs, not subscription revenue alone. Report absolute accounts and dollars for small cohorts; do not extrapolate from a handful of pilots into a $100M market forecast.

This distribution contract is specified in [Founder Acquisition & Distribution](docs/maintainers/FOUNDER-ACQUISITION-DISTRIBUTION.md), tracked under [M17](https://github.com/PlaybookMediaLLC/relay/milestone/17) and [issue #280](https://github.com/PlaybookMediaLLC/relay/issues/280). It is a commercial learning gate, **not permission to buy ads, send unsolicited campaigns, or build a broad CRM**.

## Roadmap, not release promises

The current investment order is in [GitHub milestones](https://github.com/PlaybookMediaLLC/relay/milestones), the [founder growth execution roadmap](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md) and the [acquisition scale plan](docs/maintainers/ACQUISITION-EXECUTION-SCALE-PLAN.md). The historical [IRFC-0001–0032](docs/maintainers/rfcs/implementation/README.md) documents technical contracts, **not a requirement to complete the old Protect → Product Reality Engine → Sync → Launch plan**.

**Prove the first job — M13, M1–M3:** connect an authorized founder site to one relevant existing-page opportunity, an approved exact website edit, an independently verified production postcondition and later measurement that states what can and cannot be inferred.

**Test the buyer and price in parallel — M7 and M17:** compare founder-paid Grow and Protect entry offers with direct evidence. Define the recurring program, service limits, contribution margin and real buyer expansion triggers. Do not conflate research credits with paid acquisition execution.

**Make the work genuinely recurring — M15 with M5/M10:** introduce a useful weekly founder review, a small number of approved repeat playbooks, page history, decision memory, cooldowns and credible no-action weeks. More recommendations are not automatically more value.

**Ground acquisition in real customer behavior — M16 with selected M9:** connect the founder's qualified conversion definition and permitted data, then preserve four evidence clocks. An accurate record of delivered work is useful; claiming incremental acquired customers requires a stronger measurement design.

**Broaden carefully — M14 and M18:** AI-search observations can suggest on-site work when samples are reproducible. Additional distribution/outbound/partner or paid acquisition handoffs require concrete paying demand, scoped approvals, a reliable destination receipt and a clear boundary with Shots, Verify/Warmbly and a future Playbook Operator. M4/M6 general platforms and M8/M11/M12 remain deferred or tightly bounded.

**The next engineering test** remains one end-to-end source-controlled opportunity on a Playbook site, followed by external independent-founder paid pilots. **The next company test** is whether buyers return for several useful review cycles, pay enough to cover ongoing execution and support, and expand spending as their own software companies grow.

We are building toward a large recurring acquisition business, but the evidence, permissions, unit economics and customer outcomes decide whether Relay has earned each additional responsibility.
