# Maintainer documentation

Shared versioned documentation for maintaining the Playbook Media Relay codebase, an MIT-licensed derivative of OpenSEO. Do not store secrets, user-identifying data, private client evidence, or unreviewed provider credentials here.

## Read these first

| Purpose | Source |
| --- | --- |
| Current product vision and founder customer | [Relay vision](../../vision.md) |
| Commercial thesis, pricing and buyer boundaries | [Company](../../company.md) |
| Current engineering and staged investment priorities | [Growth Execution Roadmap](GROWTH-EXECUTION-ROADMAP.md) |
| How Relay might support $100M+ ARR without assuming traction | [Acquisition Execution Scale Plan](ACQUISITION-EXECUTION-SCALE-PLAN.md) |
| How to find paying founder-led software businesses economically | [Founder Acquisition & Distribution](FOUNDER-ACQUISITION-DISTRIBUTION.md) |
| How existing RFCs relate to GitHub issues/milestones | [RFC Milestone Traceability](RFC-MILESTONE-TRACEABILITY.md) |
| Historical RFC implementation specifications | [RFC index](rfcs/README.md) and [IRFC sequence](rfcs/implementation/README.md) |
| Dated implementation baseline, not current production proof | [Release Assurance Audit](relay-release-assurance-audit.md) |
| Safety and review invariants | [Review Guidelines](review-guidelines.md) and [AGENTS.md](../../AGENTS.md) |
| Runtime and deployment notes | [Playbook Deployment](playbook-deployment.md) |

## Current engineering posture

**M13** proves one real, founder-approved website acquisition improvement reaches production with an independently checked technical result. **M7 and M17** validate actual paying founder customers, repeat use, distribution, gross contribution and expansion economics. **M15 and M16** are the next recurring-work and qualified-outcome layers. **M18** is a conditional, permissioned channel handoff, not a general marketing automation mandate.

The earlier Protect → generalized Product Reality Engine → Sync → Relay-owned Launch roadmap is preserved for technical reference. It is **not** the automatic sequence for new agents. The implementation index remains relevant only to an approved historical technical slice; keep its original acceptance and security requirements.

Make the distinction between **implemented code**, **staging/test evidence**, **customer-authorized production acceptance**, **paid renewal**, and **observed acquisition benefit** explicit. A successful merged PR is not a production-verified change, and a traffic increase after a change is not a causal customer-acquisition claim. Never rebuild an implemented feature merely because a new milestone names the same domain.

New backend work generally follows existing TanStack server functions → feature services → repositories with project/tenant scope, approval, cost admission, auditable operations and dual SQLite/Postgres parity. Prefer extending shipped components to creating additional infrastructure and repeated shared schemas. Refer to AGENTS.md and review-guidelines.md for code-level instructions.

Keep bug fixes, PR review notes, test results and delivery evidence on their related GitHub PRs and issues. Record repository friction in `.agents/PAPERCUTS.md`. Source documents here can express an ambition, but only live evidence can establish that the product or business achieved it.
