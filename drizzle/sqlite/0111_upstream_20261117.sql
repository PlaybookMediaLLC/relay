CREATE TABLE `guest_accounts` (
	`user_id` text PRIMARY KEY NOT NULL,
	`ip_hash` text NOT NULL,
	`slot` integer DEFAULT 0 NOT NULL,
	`claim_token` text NOT NULL,
	`agent` text,
	`claimed_by_user_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`claimed_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_accounts_claim_token_unique` ON `guest_accounts` (`claim_token`);--> statement-breakpoint
CREATE UNIQUE INDEX `guest_accounts_ip_hash_slot_idx` ON `guest_accounts` (`ip_hash`,`slot`);--> statement-breakpoint
CREATE TABLE `stripe_projects_grant` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`organization_id` text NOT NULL,
	`stripe_account_id` text NOT NULL,
	`access_token_hash` text NOT NULL,
	`access_token_expires_at` text NOT NULL,
	`refresh_token_hash` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_projects_grant_access_token_idx` ON `stripe_projects_grant` (`access_token_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_projects_grant_refresh_token_idx` ON `stripe_projects_grant` (`refresh_token_hash`);--> statement-breakpoint
CREATE INDEX `stripe_projects_grant_user_idx` ON `stripe_projects_grant` (`user_id`);--> statement-breakpoint
CREATE TABLE `stripe_projects_resource` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`organization_id` text NOT NULL,
	`stripe_account_id` text NOT NULL,
	`api_key_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `stripe_projects_resource_user_idx` ON `stripe_projects_resource` (`user_id`);--> statement-breakpoint
ALTER TABLE `organization_activation_state` ADD `trustpilot_invited_at` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `brand_name` text;--> statement-breakpoint
ALTER TABLE `user_signup_campaigns` ADD `entry` text;--> statement-breakpoint
ALTER TABLE `user_signup_campaigns` ADD `was_guest` integer;--> statement-breakpoint
ALTER TABLE `user_signup_campaigns` ADD `agent` text;--> statement-breakpoint
ALTER TABLE `user_signup_campaigns` ADD `utm_medium` text;--> statement-breakpoint
ALTER TABLE `ai_trackers` ADD `google_ai_mode` integer DEFAULT false NOT NULL;