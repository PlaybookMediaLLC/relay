# MILESTONE-SEO-01: SEO finding → approved fix → verified outcome

**Status:** Proposed  
**Target branch:** `develop`  
**Owner:** Unassigned  
**Due date:** Not set; ship on verified acceptance, not an arbitrary date  
**Tracking:** GitHub Issues are disabled in this repository, so this is a versioned milestone specification rather than a GitHub Milestone object.

## Customer outcome

For a connected, authorized, GitHub-managed Next.js SaaS site, Relay takes **one credible SEO finding or confirmed production regression** from evidence to a narrow, human-approved change, observes the customer's deployment, independently checks the original problem in production, and records later search-performance observations without implying causality.

**First priority:** deliver the complete real-site Relay Protect correction loop. Then make it available to selected SEO growth opportunities. This specification collects outcomes from the existing roadmap; it does **not** reorder or supersede the [sequential implementation IRFCs](../rfcs/implementation/README.md).

## Existing foundation to preserve

- DataForSEO-backed keyword research, rank tracking, backlink analysis, site audits, AI visibility, and usage metering.
- Search Console and GA4, evidence-backed opportunities, investigations, scheduled jobs, and project/tenant controls.
- GitHub proposal/approval records and narrow Next.js source edits. Customer maintains merge, CI and deployment control.
- Existing [Experiments & Results](../../EXPERIMENTS.md): 28-day GSC baseline, 7-day excluded period, 28-day observation window; current deployment confirmation requires a human.
- Site-comparison rules, production-check architecture, GitHub deployment reads, and reviewer/work views.

Do not describe a merged PR, passing test, or existing experiment record as an independently verified production fix.

## Deliverables

### 1. Evidence becomes actionable, deduplicated work

- [ ] Reuse existing SEO opportunities, site checks, investigations and confirmed protection incidents. **An SEO opportunity is not a production incident.**
- [ ] Show affected page, observed/baseline values, source, freshness, confidence, severity, expected impact, recommended action and verification method.
- [ ] Deduplicate findings, preserve their evidence revisions, explain why a recommendation was raised, and avoid opening work from weak or stale evidence.
- [ ] Offer meaningful states such as investigating, ready for review, approved, PR opened, awaiting deployment, verifying, verified, inconclusive and blocked.
- [ ] Enforce provider spending budgets, job frequency, cooldowns and repeat-change suppression.

**Related IRFCs:** [0002](../rfcs/implementation/0002-establish-protected-pages-and-known-good-production-baselines.md), [0003](../rfcs/implementation/0003-confirm-deduplicate-and-explain-production-regressions.md), later [0023](../rfcs/implementation/0023-persist-page-history-and-prevent-repeated-ineffective-work.md).

### 2. Prepare and execute safe, reviewed changes

- [ ] Reuse the existing literal metadata proposal path and source-mapped title/description restoration for confirmed regressions.
- [ ] Bind each proposed edit to verified repo, branch, base commit, exact source file and URL; display immutable before/after diff, source evidence, preview checks and risk.
- [ ] Require a fresh explicit approval for the exact GitHub PR write. Recheck repository scope, source fingerprint, credentials and source SHA before execution.
- [ ] Reject unsupported dynamic routing, ambiguous mappings, product claims without evidence, stale source or unknown writers with a useful ticket; never improvise a broad edit.
- [ ] Expand to individual canonical URL, structured data, internal link and supported Markdown/MDX edits **only after** their own source-mapping and safety contracts pass. Do not delay the initial verified-repair milestone for these extensions.

**Related IRFCs:** [0004](../rfcs/implementation/0004-prepare-source-mapped-repair-proposals-from-confirmed-incidents.md), [0005](../rfcs/implementation/0005-authorize-exact-pr-writes-and-check-customer-owned-previews.md); existing [GitHub publishing](../../GITHUB_PUBLISHING.md).

### 3. Observe deployment and independently verify results

- [ ] Persist separate receipts for proposal, approval, PR, verified merge, observed production deployment, provenance and fresh live-site verification.
- [ ] Re-run the **original failing rule** on the actual production destination after deployment; do not infer resolution from green CI, a preview, or a merged PR.
- [ ] Preserve honest `unverified`, `not deployed`, `unknown`, `still broken`, `fixed independently` and `regressed again` states, including retries and idempotence.
- [ ] Reuse scheduled jobs and available GitHub deployment signals to reduce manual follow-up where reliable; do not claim production deployment based solely on a release event.
- [ ] Reuse existing Search Console experiment windows and data-quality thresholds for SEO outcomes. Record traffic observations as observational, not causal; insufficient data must return inconclusive.

**Related IRFCs:** [0006](../rfcs/implementation/0006-verify-repaired-behavior-in-production.md), [0007](../rfcs/implementation/0007-productize-protect-work-reports-and-recurring-service.md); [Experiments and Results](../../EXPERIMENTS.md).

### 4. Keep every proposed claim truthful

- [ ] Surface claims introduced or modified by proposed SEO/content changes. Require trustworthy evidence or review for feature availability, pricing, plan limits, geography, integrations and effective dates.
- [ ] Fail closed when the underlying product fact is unknown or conflicting.
- [ ] **Do not block Protect on the entire Product Reality Engine.** Integrate the larger scoped, versioned fact-to-claim model as the separate Sync implementation matures.

**Later IRFCs:** [0013–0019](../rfcs/implementation/README.md), particularly [0019](../rfcs/implementation/0019-ship-relay-sync-for-pricing-and-integration-drift.md).

### 5. Give the operator one inspectable history

- [ ] Connect evidence, issue, approval, exact diff, PR, production observation, verification receipt, cost and SEO measurement within the existing reviewer workflow.
- [ ] Show what is blocked, who needs to act, and whether Relay has proved completion.
- [ ] Record precise operator time, false alerts, detection and resolution latency, provider cost, verified repairs and repeat use to support a bounded paid Protect pilot.

## Required acceptance scenarios

**A. Real-site regression:** On an authorized production Next.js site, a supported metadata regression is detected and confirmed. Relay identifies the exact source literal, prepares a safe restoration, obtains approval, opens a PR, waits for customer merge/deployment, observes the deployed change and independently confirms the original failing rule now passes. Link the evidence and receipt at every step.

**B. Evidence-backed SEO opportunity:** A supported opportunity results in a reviewed GitHub proposal, registered experiment and later scheduled/readable Search Console observation. Respect the existing 28/7/28-day window and minimum-data safeguards. `Inconclusive` is acceptable; invented uplift is not.

**C. Safety and refusal:** Demonstrate that stale source, revoked access, unsupported edits, duplicate incidents, missing deploy evidence, conflicting product claims and failed live checks do not silently succeed or create repeated changes.

**D. Measured feasibility:** On at least one authorized live site, capture repeatable evidence, tested revision, operator effort, false-positive outcome, provider/compute cost and supported production-resolution proof. Distinguish fixtures from real deployment.

**Completion is a verified workflow, not a count of PRs or finished RFC documents.**

## Deliberately outside this milestone

- Replicating Cogny's Google/Meta/LinkedIn advertising, CRM or email execution catalogs.
- Unrestricted AI content writing, autonomous production publishing, automatic merge/deploy or arbitrary source modifications.
- WordPress/Webflow adapters until validated customer demand, credentials policy and independent destination verification justify them.
- Full Sync, Launch or the complete Product Reality Engine; retain their existing IRFC gates.

## Recommended order

1. Reconcile `develop` with required Protect [IRFC-0001–0007](../rfcs/implementation/README.md) and finish one authorized production-verified repair.
2. Join findings, reviewer action, scheduled verification and the existing experiment record into one work history.
3. Verify the supported SEO-opportunity path with honest later performance measurement.
4. Add narrowly proven safe edit types and progressively introduce fact-backed claim checks.
5. Only then evaluate new CMS publishing destinations.

**Principle:** Optimize for independently verified customer results and a manageable cost per completed repair, not integration count.
