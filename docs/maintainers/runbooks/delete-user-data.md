# Delete a user's data (Relay)

Relay uses upstream's account deletion. A user deletes their own account in **Settings → Personal → Delete account**. The daily cron erases the account 14 days later. [account-deletion.md](../account-deletion.md) tells what each step deletes and how to cancel a request.

The upstream sync of 2026-11-04 removed `scripts/relay-erase-user-d1.ts`. Upstream deleted the shared module and the Worker storage endpoint that the script used.

## One-time setup

1. Add `POSTHOG_PROJECT_ID`, `POSTHOG_ACCOUNT_DELETION_API_KEY` and `LOOPS_TRANSACTIONAL_ACCOUNT_DELETION_ID` to `ENV_PLAYBOOK`, then deploy. Without the PostHog values, each erasure fails and moves one day later. [account-deletion.md](../account-deletion.md) tells how to make the PostHog key and the Loops email.
2. Check that the R2 bucket `open-seo-r2-playbook` has a lifecycle rule that expires `dataforseo-cache/`. Older prompt-cache objects cannot be linked to a user, so they must expire. On 2026-10-16, the rule `dataforseo-cache-expiry` expired them after 7 days.

## When a user requests deletion

Relay production runs on PostgreSQL. After erasure, no record names the user. Record the user id during the 14-day wait:

```sql
select user_id, delete_after from account_deletion_requests;
```

## Gaps that stay manual

Upstream's erasure does not know Relay's own data. Do these steps by hand after the cron erases the account. Work on them is open.

1. **Attribution columns without a foreign key.** In a shared workspace, these columns keep the deleted user's id. In production PostgreSQL, set each one to `gdpr-deleted-user` where it equals the recorded user id:
   - `crawler_credentials.created_by_user_id`, `project_research_log.created_by`
   - `opportunities.owner_user_id`, `opportunity_runs.requested_by`, `opportunity_decisions.actor_user_id`, `opportunity_proposals.created_by`, `opportunity_tickets.created_by`, `proposal_approvals.actor_user_id`
   - `publishing_connections.created_by`, `github_app_installations.created_by`, `project_publishing_approvers.granted_by_user_id`
   - `growth_experiments.created_by`, `measurement_runs.requested_by`, `experiment_deployment_signals.created_by`
   - `agency_client_links.requested_by_user_id`, `accepted_by_user_id` and `ended_by_user_id`, `organization_branding.updated_by_user_id`
   - `protection_enrollments.reviewer_user_id`, `created_by` and `updated_by`, `monitored_pages.added_by` and `removed_by`, `protection_scope_changes.changed_by`
2. **GitHub personal access tokens.** Erasure deletes the token rows of the user's solo workspaces. It does not revoke the tokens at GitHub. Ask the user to revoke each token in their GitHub settings.
3. **GitHub App.** If the user installed the Relay GitHub App, ask them to uninstall it. Relay cannot uninstall it for them.
4. **The D1 rollback copy.** The D1 database `open-seo-db-playbook` stays for rollback from PostgreSQL. It holds user data from before the switch, and erasure does not touch it. Delete the user's rows there too, or delete the database when the rollback window ends.
