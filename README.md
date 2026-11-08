# Relay

**Turn real customer demand into safe, measurable website growth work.**

Relay, by Playbook Media LLC, is building a code-native growth execution product for **independent software founders**. It connects search and website evidence to one practical improvement: choose a relevant opportunity, prepare a narrow change in the founder's repository, obtain exact approval, verify it live, and track later acquisition observations without claiming unsupported traffic or revenue lift.

**Today:** Relay has a substantial open-source SEO, GitHub publishing and measurement foundation. **Next:** validate an end-to-end existing-page opportunity → reviewed GitHub PR → production-verified site change, and test paid founder demand. Release assurance remains a supporting technical capability and a separate commercial experiment. Broad Sync, Product Reality Engine and Relay-owned Launch work are not the default build direction.

[Use Relay](https://relay.playbookmedia.io) · [North-star vision](vision.md) · [Company thesis](company.md) · [Active growth milestones](docs/maintainers/GROWTH-EXECUTION-ROADMAP.md) · [RFC implementation specifications](docs/maintainers/rfcs/implementation/README.md)

Relay is an independent, MIT-licensed derivative of [OpenSEO](https://github.com/every-app/open-seo); it retains upstream attribution, core research capabilities and reviewed upstream-sync. Some internal package and plugin names still say OpenSEO.

## What the repository contains

- Keyword discovery, rank tracking, backlinks, competitor/site research, AI visibility, and metered DataForSEO calls.
- Google Search Console and GA4 connections; source-backed SEO opportunities, prioritization, investigations and selected AI drafts.
- [GitHub publishing proposals](docs/GITHUB_PUBLISHING.md) for supported Next.js metadata and narrow copy/Markdown changes with exact reviewer authorization. Customer CI, merging and deployment remain under the customer's control.
- [Experiments and results](docs/EXPERIMENTS.md), SEO and release checks against supplied previews, before/after observation windows, eligible accessibility/performance tests, and first-touch Stripe attribution.
- Documentation indexing, scheduled jobs, notifications, spending limits, activity records, MCP and a weekly work view.

These are **implemented foundations**, not proof that a customer gained traffic or that every cross-system workflow is production-ready. The [dated codebase audit](docs/maintainers/relay-release-assurance-audit.md) records its original acceptance limits. The existing Protect baseline/incident/repair path has separate unfinished acceptance gates; the current growth workflow can reuse the already-supported SEO publisher and experiments without waiting for all historical Protect work.

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

## Hosted plans and usage

The current [hosted research service](https://relay.playbookmedia.io) documents a free tier with $1 in monthly credits and a $10/month Base Plan with $10 in monthly credits, plus top-ups. DataForSEO and some AI calls consume metered credits. These are **research-plan terms, not priced or validated subscriptions for Grow or Protect**.

A founder-paid growth workflow and a scoped Protect service are separate packaging hypotheses. Their prices, entitlements, real provider costs and renewal behavior require pilots; no Sync/Launch subscription is promised. Self-hosters supply provider credentials and infrastructure resources. See [DataForSEO key setup](docs/DATAFORSEO_API_KEY.md).

## Self-hosting

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
