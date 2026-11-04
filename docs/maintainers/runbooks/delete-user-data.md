# Delete a user's data (Relay)

Relay uses upstream's account deletion. A user deletes their own account in **Settings → Personal → Delete account**. The daily cron erases the account 14 days later. [account-deletion.md](../account-deletion.md) tells what each step deletes and how to cancel a request.

The upstream sync of 2026-11-04 removed `scripts/relay-erase-user-d1.ts`. Upstream deleted the shared module and the Worker storage endpoint that the script used.

## One-time setup

1. Add `POSTHOG_PROJECT_ID`, `POSTHOG_ACCOUNT_DELETION_API_KEY` and `LOOPS_TRANSACTIONAL_ACCOUNT_DELETION_ID` to `ENV_PLAYBOOK`, then deploy. Without the PostHog values, each erasure fails and moves one day later. [account-deletion.md](../account-deletion.md) tells how to make the PostHog key and the Loops email.
2. Check that the R2 bucket `open-seo-r2-playbook` has a lifecycle rule that expires `dataforseo-cache/`. Older prompt-cache objects cannot be linked to a user, so they must expire. On 2026-10-16, the rule `dataforseo-cache-expiry` expired them after 7 days.

## What Relay adds to the erasure

In the same database batch as upstream's erasure, `src/server/account-deletion/relayErasure.ts` does these steps:

1. It sets Relay's user columns without a foreign key to `gdpr-deleted-user` in the workspaces that stay. `opportunity_proposals.created_by` keeps the old id, because the proposal's change hash includes it.
2. It revokes the user's GitHub personal access token connections in the workspaces that stay. A member reconnects the repository.
3. It deletes the activity log and spend ledger rows of the erased workspaces. These tables have no foreign key to the workspace.
4. It deletes the user's digest preferences, notification read marks and expired GitHub App install states.

When you add a Relay table with a user column, add the column to that file.

## When a user requests deletion

Relay production runs on PostgreSQL. After erasure, no record names the user. Record the user id during the 14-day wait:

```sql
select user_id, delete_after from account_deletion_requests;
```

## Steps that stay manual

1. **GitHub personal access tokens.** Erasure removes the stored tokens from Relay. It does not revoke them at GitHub. Ask the user to revoke each token in their GitHub settings.
2. **GitHub App.** If the user installed the Relay GitHub App, ask them to uninstall it. Relay cannot uninstall it for them.
3. **The D1 rollback copy.** The D1 database `open-seo-db-playbook` stays for rollback from PostgreSQL. It holds user data from before the switch, and erasure does not touch it. Delete the user's rows there too, or delete the database when the rollback window ends.
