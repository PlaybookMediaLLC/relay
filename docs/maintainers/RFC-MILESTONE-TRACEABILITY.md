# Relay RFC → GitHub Milestone Traceability

**Inventory reviewed:** 46 canonical technical RFCs (`RFC-0001–0046`) and 31 implementation-ordered IRFC slices (`IRFC-0001–0007, 0009–0032`).  
**Tracked:** Each active IRFC has one primary GitHub milestone and an implementation/acceptance issue. The historical RFCs map to one **primary reference milestone** below; their overlapping phases are linked through IRFC issues, not duplicated as second implementation tickets.  
**Decision owner:** Playbook Media LLC. **Due dates:** none inferred. **Status:** mapping, not proof of completion.

## Strategy and execution rules

1. **First commercial objective:** protect a handful of authorized GitHub-managed Next.js customer pages, confirm a regression, prepare one safe human-approved repair, verify production, and test actual paid recurring demand. A merged PR is not a verified repair. SEO traffic change is not proof of causation.
2. **Do not split or rebuild implemented foundation.** Historical RFC-0001–0017 code scopes are recorded as implemented with external/live-acceptance follow-ups. The current IRFC work must inspect `develop` and reuse shipped services, schemas, OAuth, approvals and UI.
3. **Use the existing sequential queue** as the development authority: [IRFC implementation index](rfcs/implementation/README.md). Milestone IDs describe customer outcomes and **do not renumber or reorder** IRFC identifiers; commercial discovery can run in parallel.
4. **No artificial critical path:** M9–M12 are gated experiments/extensions, not mandatory work before Protect or paid Sync. M12 is research only, not a feature commitment. No arbitrary due dates or auto-publishing/merge authority.
5. **One primary assignment per issue.** A source RFC can inform multiple IRFC slices, but every IRFC issue belongs to exactly one milestone. Related dependencies go into issue text and the canonical technical spec.

## Milestone taxonomy

| Milestone | Release position | Definition of useful completion |
| --- | --- | --- |
| **M1 — Evidence-backed SEO and production findings** | Core Protect | Detect and confirm a real production regression; preserve the distinction from SEO opportunities. |
| **M2 — Approved source-mapped GitHub edits** | Core Protect | Open precisely one authorized safe PR with verified source mapping and customer-owned preview checks. |
| **M3 — Independent production verification** | Core Protect | Prove the original production failure is resolved; keep GSC/revenue observations separate. |
| **M7 — Paid Protect pilot and commercial gates** | Commercial gate | Validate a paid bounded protection service, renewals, economic viability and the Sync/Launch expansion decision. |
| **M6 — Product Reality Engine foundation** | After Protect; PRE core | Keep change evidence, scoped credentials and permissions sound; reuse existing systems. |
| **M4 — Product truth and claim integrity** | After PRE core; Sync | Match accepted scoped/versioned facts to public claims and verify approved corrections. |
| **M5 — Reviewer workbench and measured results** | Incremental across stages | Unify review and verification UI; reuse existing This Week/Opportunities/Activity. |
| **M8 — Relay Launch** | After Sync evidence; Launch | Deliver fact-backed coordinated customer release work, verified per destination. |
| **M9 — Protected journeys and revenue integrity** | Demand-gated extension | Safe browser journeys and conversion/revenue instrumentation, not speculative attribution. |
| **M10 — Sustainable SEO growth and content recovery** | Demand-gated extension | Page history, bounded SEO improvements, sourced pages and optional competitor reaction. |
| **M11 — Onboarding/support/enablement integrity** | Demand-gated extension | Onboarding, support and sales/partner asset accuracy without a CRM/help-desk replacement. |
| **M12 — Optional infrastructure/authorization research** | Optional research only | Decide whether untrusted hosted previews or delegated policies are safe and worth building. |

**Critical path:** M1 → M2 → M3 → M7 (commercial go/no-go); then M6 → M4 → M8. M5 is built incrementally without delaying live Protect. M9–M12 require their own paid-demand and safety gates; they are not an ordered mandatory sequence.

**Commercial vs technical gate:** RFC-0029 is deliberately a founder decision record [issue #263](https://github.com/PlaybookMediaLLC/relay/issues/263), not another IRFC. Do not claim pilot success based only on unit tests, fixtures or the absence of incidents.

## Canonical development queue — all 31 IRFCs

| IRFC | Primary milestone | GitHub issue | Source specification |
| --- | --- | --- | --- |
| [IRFC-0001](rfcs/implementation/0001-record-protected-site-scope-and-activation.md) | **M1** | [#232](https://github.com/PlaybookMediaLLC/relay/issues/232) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0002](rfcs/implementation/0002-establish-protected-pages-and-known-good-production-baselines.md) | **M1** | [#234](https://github.com/PlaybookMediaLLC/relay/issues/234) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0003](rfcs/implementation/0003-confirm-deduplicate-and-explain-production-regressions.md) | **M1** | [#233](https://github.com/PlaybookMediaLLC/relay/issues/233) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0004](rfcs/implementation/0004-prepare-source-mapped-repair-proposals-from-confirmed-incidents.md) | **M2** | [#235](https://github.com/PlaybookMediaLLC/relay/issues/235) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0005](rfcs/implementation/0005-authorize-exact-pr-writes-and-check-customer-owned-previews.md) | **M2** | [#236](https://github.com/PlaybookMediaLLC/relay/issues/236) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0006](rfcs/implementation/0006-verify-repaired-behavior-in-production.md) | **M3** | [#237](https://github.com/PlaybookMediaLLC/relay/issues/237) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0007](rfcs/implementation/0007-productize-protect-work-reports-and-recurring-service.md) | **M7** | [#240](https://github.com/PlaybookMediaLLC/relay/issues/240) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0009](rfcs/implementation/0009-establish-the-minimal-product-reality-engine-kernel.md) | **M6** | [#238](https://github.com/PlaybookMediaLLC/relay/issues/238) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0010](rfcs/implementation/0010-enforce-tenant-privacy-authorization-and-spend-invariants.md) | **M6** | [#241](https://github.com/PlaybookMediaLLC/relay/issues/241) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0011](rfcs/implementation/0011-introduce-bounded-connector-contracts-and-health.md) | **M6** | [#239](https://github.com/PlaybookMediaLLC/relay/issues/239) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0012](rfcs/implementation/0012-ingest-and-replay-product-change-observations.md) | **M6** | [#242](https://github.com/PlaybookMediaLLC/relay/issues/242) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0013](rfcs/implementation/0013-model-typed-scoped-versioned-product-facts.md) | **M4** | [#243](https://github.com/PlaybookMediaLLC/relay/issues/243) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0014](rfcs/implementation/0014-index-customer-facing-assets-and-attributable-claims.md) | **M4** | [#247](https://github.com/PlaybookMediaLLC/relay/issues/247) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0015](rfcs/implementation/0015-resolve-deterministic-change-to-asset-impact.md) | **M4** | [#244](https://github.com/PlaybookMediaLLC/relay/issues/244) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0016](rfcs/implementation/0016-create-reviewed-cross-system-work-plans.md) | **M6** | [#245](https://github.com/PlaybookMediaLLC/relay/issues/245) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0017](rfcs/implementation/0017-record-delivery-receipts-and-independent-outcome-verification.md) | **M3** | [#246](https://github.com/PlaybookMediaLLC/relay/issues/246) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0018](rfcs/implementation/0018-deliver-the-reviewer-workbench-incrementally.md) | **M5** | [#248](https://github.com/PlaybookMediaLLC/relay/issues/248) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0019](rfcs/implementation/0019-ship-relay-sync-for-pricing-and-integration-drift.md) | **M4** | [#249](https://github.com/PlaybookMediaLLC/relay/issues/249) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0020](rfcs/implementation/0020-check-existing-customer-created-launch-pages.md) | **M8** | [#250](https://github.com/PlaybookMediaLLC/relay/issues/250) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0021](rfcs/implementation/0021-deliver-approved-relay-launch-release-packets.md) | **M8** | [#252](https://github.com/PlaybookMediaLLC/relay/issues/252) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0022](rfcs/implementation/0022-expose-read-only-api-and-mcp-workflows.md) | **M6** | [#251](https://github.com/PlaybookMediaLLC/relay/issues/251) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0023](rfcs/implementation/0023-persist-page-history-and-prevent-repeated-ineffective-work.md) | **M10** | [#254](https://github.com/PlaybookMediaLLC/relay/issues/254) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0024](rfcs/implementation/0024-expand-protected-revenue-critical-customer-journeys.md) | **M9** | [#253](https://github.com/PlaybookMediaLLC/relay/issues/253) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0025](rfcs/implementation/0025-verify-conversion-and-revenue-instrumentation-integrity.md) | **M9** | [#255](https://github.com/PlaybookMediaLLC/relay/issues/255) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0026](rfcs/implementation/0026-operate-bounded-growth-and-content-decay-campaigns.md) | **M10** | [#256](https://github.com/PlaybookMediaLLC/relay/issues/256) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0027](rfcs/implementation/0027-create-individually-reviewed-pages-from-verified-facts.md) | **M10** | [#261](https://github.com/PlaybookMediaLLC/relay/issues/261) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0028](rfcs/implementation/0028-turn-activation-and-support-signals-into-approved-fixes.md) | **M11** | [#257](https://github.com/PlaybookMediaLLC/relay/issues/257) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0029](rfcs/implementation/0029-keep-sales-integration-and-partner-assets-accurate.md) | **M11** | [#258](https://github.com/PlaybookMediaLLC/relay/issues/258) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0030](rfcs/implementation/0030-respond-to-verified-competitor-changes.md) | **M10** | [#259](https://github.com/PlaybookMediaLLC/relay/issues/259) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0031](rfcs/implementation/0031-evaluate-isolated-relay-owned-preview-builds.md) | **M12** | [#260](https://github.com/PlaybookMediaLLC/relay/issues/260) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |
| [IRFC-0032](rfcs/implementation/0032-evaluate-narrowly-delegated-execution-policies.md) | **M12** | [#262](https://github.com/PlaybookMediaLLC/relay/issues/262) | Read linked IRFC for canonical RFC(s), prerequisites, acceptance and explicit boundary |

**IRFC-0001 status:** code for enrollment and readiness merged in [PR #214](https://github.com/PlaybookMediaLLC/relay/pull/214); the issue tracks **live acceptance and integration checks**. In its old completion note it says “no PR yet”; GitHub's merged PR is more recent evidence. Do not reimplement it.

IRFC-0008 and IRFC-0033 do not exist by design: the sequential index explicitly removed these numbers from the development queue. Do not invent placeholder issues. Historic RFC-0008 and RFC-0033 **do** exist and are covered below; they are different numbering systems.

## Source RFC inventory — all 46 original design records

This is a **primary planning relationship**, not the claim that a historically closed RFC becomes new outstanding work. Existing implementation and accepted changes remain closed; pending live acceptance is handled by the applicable downstream IRFC or pilot. When a source has a second use (for example RFC-0025's own preview build feasibility), it is referenced by the second IRFC issue instead of cloned as a new milestone issue.

| Original RFC | Source status at documented review | Primary milestone | Current implementation / commercial consumer |
| --- | --- | --- | --- |
| [RFC-0001](rfcs/0001-launch-readiness.md) | Historical implemented | **M7** | [IRFC-0001 #232](https://github.com/PlaybookMediaLLC/relay/issues/232), [IRFC-0007 #240](https://github.com/PlaybookMediaLLC/relay/issues/240) |
| [RFC-0002](rfcs/0002-opportunity-detectors.md) | Historical implemented | **M1** | [IRFC-0026 #256](https://github.com/PlaybookMediaLLC/relay/issues/256) |
| [RFC-0003](rfcs/0003-opportunity-queue.md) | Historical implemented | **M1** | [IRFC-0003 #233](https://github.com/PlaybookMediaLLC/relay/issues/233) |
| [RFC-0004](rfcs/0004-ai-seo-engineer.md) | Historical implemented | **M2** | [IRFC-0004 #235](https://github.com/PlaybookMediaLLC/relay/issues/235), [IRFC-0027 #261](https://github.com/PlaybookMediaLLC/relay/issues/261) |
| [RFC-0005](rfcs/0005-github-execution.md) | Historical implemented | **M2** | [IRFC-0004 #235](https://github.com/PlaybookMediaLLC/relay/issues/235), [IRFC-0005 #236](https://github.com/PlaybookMediaLLC/relay/issues/236), [IRFC-0016 #245](https://github.com/PlaybookMediaLLC/relay/issues/245) |
| [RFC-0006](rfcs/0006-outcome-measurement.md) | Historical implemented | **M3** | [IRFC-0006 #237](https://github.com/PlaybookMediaLLC/relay/issues/237), [IRFC-0017 #246](https://github.com/PlaybookMediaLLC/relay/issues/246) |
| [RFC-0007](rfcs/0007-portfolio-operations.md) | Historical implemented, live acceptance pending | **M6** | Implemented foundation; retain acceptance notes |
| [RFC-0008](rfcs/0008-growth-automation.md) | Historical implemented | **M1** | [IRFC-0002 #234](https://github.com/PlaybookMediaLLC/relay/issues/234), [IRFC-0003 #233](https://github.com/PlaybookMediaLLC/relay/issues/233) |
| [RFC-0009](rfcs/0009-spend-limits-and-audit-log.md) | Historical implemented | **M6** | [IRFC-0010 #241](https://github.com/PlaybookMediaLLC/relay/issues/241) |
| [RFC-0010](rfcs/0010-seo-checks-in-ci.md) | Historical implemented | **M2** | [IRFC-0005 #236](https://github.com/PlaybookMediaLLC/relay/issues/236) |
| [RFC-0011](rfcs/0011-page-group-split-tests.md) | Historical implemented, live acceptance pending | **M3** | Implemented foundation; retain acceptance notes |
| [RFC-0012](rfcs/0012-conversion-optimization.md) | Historical implemented, later phases gated | **M9** | [IRFC-0025 #255](https://github.com/PlaybookMediaLLC/relay/issues/255) |
| [RFC-0013](rfcs/0013-accessibility-fixes.md) | Historical implemented, live acceptance pending | **M9** | [IRFC-0024 #253](https://github.com/PlaybookMediaLLC/relay/issues/253) |
| [RFC-0014](rfcs/0014-web-performance.md) | Historical implemented, live acceptance pending | **M9** | [IRFC-0024 #253](https://github.com/PlaybookMediaLLC/relay/issues/253) |
| [RFC-0015](rfcs/0015-release-quality-gate.md) | Historical implemented, later packs deferred | **M2** | [IRFC-0005 #236](https://github.com/PlaybookMediaLLC/relay/issues/236) |
| [RFC-0016](rfcs/0016-revenue-attribution.md) | Historical implemented, later providers deferred | **M9** | [IRFC-0025 #255](https://github.com/PlaybookMediaLLC/relay/issues/255) |
| [RFC-0017](rfcs/0017-docs-and-support-deflection.md) | Historical implemented, connectors deferred | **M11** | [IRFC-0028 #257](https://github.com/PlaybookMediaLLC/relay/issues/257), [IRFC-0029 #258](https://github.com/PlaybookMediaLLC/relay/issues/258) |
| [RFC-0018](rfcs/0018-weekly-execution-queue.md) | Partial | **M5** | [IRFC-0007 #240](https://github.com/PlaybookMediaLLC/relay/issues/240), [IRFC-0032 #262](https://github.com/PlaybookMediaLLC/relay/issues/262) |
| [RFC-0019](rfcs/0019-release-monitoring-and-regression-repair.md) | Partial / draft, later slices outstanding | **M1** | [IRFC-0002 #234](https://github.com/PlaybookMediaLLC/relay/issues/234), [IRFC-0003 #233](https://github.com/PlaybookMediaLLC/relay/issues/233), [IRFC-0006 #237](https://github.com/PlaybookMediaLLC/relay/issues/237) |
| [RFC-0020](rfcs/0020-growth-campaigns-and-decay-recovery.md) | Proposed | **M10** | [IRFC-0026 #256](https://github.com/PlaybookMediaLLC/relay/issues/256) |
| [RFC-0021](rfcs/0021-new-pages-from-verified-facts.md) | Proposed; facts overlap with PRE | **M10** | [IRFC-0013 #243](https://github.com/PlaybookMediaLLC/relay/issues/243), [IRFC-0027 #261](https://github.com/PlaybookMediaLLC/relay/issues/261) |
| [RFC-0022](rfcs/0022-competitor-change-response.md) | Proposed | **M10** | [IRFC-0030 #259](https://github.com/PlaybookMediaLLC/relay/issues/259) |
| [RFC-0023](rfcs/0023-launch-workflows.md) | Proposed | **M8** | [IRFC-0020 #250](https://github.com/PlaybookMediaLLC/relay/issues/250) |
| [RFC-0024](rfcs/0024-change-history-and-learning.md) | Partial | **M10** | [IRFC-0023 #254](https://github.com/PlaybookMediaLLC/relay/issues/254) |
| [RFC-0025](rfcs/0025-preview-sandboxes-on-cloudflare.md) | Partial customer-preview foundation; owned builds proposed | **M2** | [IRFC-0005 #236](https://github.com/PlaybookMediaLLC/relay/issues/236), [IRFC-0031 #260](https://github.com/PlaybookMediaLLC/relay/issues/260) |
| [RFC-0026](rfcs/0026-protected-site-pilots-and-service.md) | Phase A implemented; phase B proposed | **M7** | [IRFC-0001 #232](https://github.com/PlaybookMediaLLC/relay/issues/232), [IRFC-0007 #240](https://github.com/PlaybookMediaLLC/relay/issues/240) |
| [RFC-0027](rfcs/0027-source-mapped-regression-repairs.md) | Proposed | **M2** | [IRFC-0004 #235](https://github.com/PlaybookMediaLLC/relay/issues/235), [IRFC-0005 #236](https://github.com/PlaybookMediaLLC/relay/issues/236) |
| [RFC-0028](rfcs/0028-production-repair-verification.md) | Proposed | **M3** | [IRFC-0006 #237](https://github.com/PlaybookMediaLLC/relay/issues/237) |
| [RFC-0029](rfcs/0029-commercial-pilots-rollout-and-go-no-go.md) | Proposed commercial decision, not IRFC engineering | **M7** | [commercial #263](https://github.com/PlaybookMediaLLC/relay/issues/263) |
| [RFC-0030](rfcs/0030-product-reality-engine-architecture.md) | Proposed | **M6** | [IRFC-0009 #238](https://github.com/PlaybookMediaLLC/relay/issues/238) |
| [RFC-0031](rfcs/0031-platform-governance-privacy-metering-and-service-quality.md) | Proposed | **M6** | [IRFC-0010 #241](https://github.com/PlaybookMediaLLC/relay/issues/241) |
| [RFC-0032](rfcs/0032-connector-runtime-permissions-and-health.md) | Proposed | **M6** | [IRFC-0011 #239](https://github.com/PlaybookMediaLLC/relay/issues/239) |
| [RFC-0033](rfcs/0033-change-observation-and-provenance.md) | Proposed | **M6** | [IRFC-0012 #242](https://github.com/PlaybookMediaLLC/relay/issues/242) |
| [RFC-0034](rfcs/0034-versioned-product-facts-and-authority.md) | Proposed | **M4** | [IRFC-0013 #243](https://github.com/PlaybookMediaLLC/relay/issues/243) |
| [RFC-0035](rfcs/0035-customer-facing-assets-and-claims.md) | Proposed | **M4** | [IRFC-0014 #247](https://github.com/PlaybookMediaLLC/relay/issues/247) |
| [RFC-0036](rfcs/0036-impact-analysis-and-dependency-graph.md) | Proposed | **M4** | [IRFC-0015 #244](https://github.com/PlaybookMediaLLC/relay/issues/244) |
| [RFC-0037](rfcs/0037-work-plans-authorization-and-execution.md) | Proposed | **M6** | [IRFC-0016 #245](https://github.com/PlaybookMediaLLC/relay/issues/245) |
| [RFC-0038](rfcs/0038-verification-outcomes-and-learning.md) | Proposed | **M3** | [IRFC-0017 #246](https://github.com/PlaybookMediaLLC/relay/issues/246) |
| [RFC-0039](rfcs/0039-product-workbench-ux-and-human-review.md) | Proposed | **M5** | [IRFC-0018 #248](https://github.com/PlaybookMediaLLC/relay/issues/248) |
| [RFC-0040](rfcs/0040-relay-sync-product-truth-and-content-integrity.md) | Proposed | **M4** | [IRFC-0019 #249](https://github.com/PlaybookMediaLLC/relay/issues/249) |
| [RFC-0041](rfcs/0041-versioned-api-mcp-and-event-subscriptions.md) | Proposed | **M6** | [IRFC-0022 #251](https://github.com/PlaybookMediaLLC/relay/issues/251) |
| [RFC-0042](rfcs/0042-relay-launch-change-to-commercial-release.md) | Proposed | **M8** | [IRFC-0021 #252](https://github.com/PlaybookMediaLLC/relay/issues/252) |
| [RFC-0043](rfcs/0043-relay-protect-journey-and-release-assurance.md) | Proposed | **M9** | [IRFC-0024 #253](https://github.com/PlaybookMediaLLC/relay/issues/253) |
| [RFC-0044](rfcs/0044-conversion-revenue-and-attribution-integrity.md) | Proposed | **M9** | [IRFC-0025 #255](https://github.com/PlaybookMediaLLC/relay/issues/255) |
| [RFC-0045](rfcs/0045-activation-support-and-experience-signals.md) | Proposed | **M11** | [IRFC-0028 #257](https://github.com/PlaybookMediaLLC/relay/issues/257) |
| [RFC-0046](rfcs/0046-enablement-integrations-and-partner-assets.md) | Proposed | **M11** | [IRFC-0029 #258](https://github.com/PlaybookMediaLLC/relay/issues/258) |

### Deliberate scope splits

- **RFC-0019:** baseline and confirmation belong to M1; original-failure production verification is completed under M3/IRFC-0006.
- **RFC-0025:** customer-owned previews belong to M2/IRFC-0005; *Relay-hosted untrusted builds* are a later optional M12 feasibility decision under IRFC-0031.
- **RFC-0021 and RFC-0034:** one canonical typed fact registry under M4/IRFC-0013; new-page creation is M10/IRFC-0027. Do not build two incompatible business-fact tables.
- **RFC-0018:** existing work/report code is reused under M5; bounded paid service reporting is IRFC-0007 under M7; standing approvals are optional IRFC-0032 under M12.
- **RFC-0029:** founder-led paid evidence gates under M7; it is intentionally not part of the engineering-only IRFC queue.
- **RFC-0037/0038/0039:** share existing exact-change approvals, independent destination verification and Workbench UI. Their primary assignments (M6/M3/M5) identify accountable delivery and don't create duplicate frameworks.
- **IRFC-0022 / RFC-0041:** read-only API/MCP is M6 but optional; it is not a prerequisite for Launch M8 or an excuse for unrestricted agent writes.

## Issue maintenance and acceptance

- Keep a canonical spec in source control and use its GitHub issue as the task/evidence log. If code already satisfies an IRFC, mark verified existing with concrete source/PR/test links; close only when that IRFC's **specific** acceptance conditions are met.
- A paid pilot, real production check or multi-day observation cannot be replaced by an invented fixture. Treat provider authorization, customer ownership, measurement sufficiency and revocations as distinct blockers.
- Only a factual customer demand or an accepted technical gate promotes M9–M12 from deferred/optional to active planning. Avoid multi-channel ads/CRM/email platform parity with Cogny; Relay's product is customer-facing release correctness and verified completion.
- GitHub milestone data is created/linked by [the idempotent workflow](../../.github/workflows/register-relay-rfc-milestones.yml) using `issues: write`. M1–M5 and their original umbrella issues were created before this mapping; the workflow creates M6–M12 and links the IRFC issues assigned to them. User-owned repo rules still require PR review for default-branch changes.
