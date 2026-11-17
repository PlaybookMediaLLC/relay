CREATE TABLE "guest_accounts" (
	"user_id" text PRIMARY KEY NOT NULL,
	"ip_hash" text NOT NULL,
	"slot" integer DEFAULT 0 NOT NULL,
	"claim_token" text NOT NULL,
	"agent" text,
	"claimed_by_user_id" text,
	"created_at" text NOT NULL,
	CONSTRAINT "guest_accounts_claim_token_unique" UNIQUE("claim_token")
);
--> statement-breakpoint
CREATE TABLE "stripe_projects_grant" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"stripe_account_id" text NOT NULL,
	"access_token_hash" text NOT NULL,
	"access_token_expires_at" text NOT NULL,
	"refresh_token_hash" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stripe_projects_resource" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"stripe_account_id" text NOT NULL,
	"api_key_id" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organization_activation_state" ADD COLUMN "trustpilot_invited_at" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "brand_name" text;--> statement-breakpoint
ALTER TABLE "user_signup_campaigns" ADD COLUMN "entry" text;--> statement-breakpoint
ALTER TABLE "user_signup_campaigns" ADD COLUMN "was_guest" boolean;--> statement-breakpoint
ALTER TABLE "user_signup_campaigns" ADD COLUMN "agent" text;--> statement-breakpoint
ALTER TABLE "user_signup_campaigns" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "ai_trackers" ADD COLUMN "google_ai_mode" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "guest_accounts" ADD CONSTRAINT "guest_accounts_claimed_by_user_id_user_id_fk" FOREIGN KEY ("claimed_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_projects_grant" ADD CONSTRAINT "stripe_projects_grant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_projects_grant" ADD CONSTRAINT "stripe_projects_grant_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_projects_resource" ADD CONSTRAINT "stripe_projects_resource_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_projects_resource" ADD CONSTRAINT "stripe_projects_resource_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "guest_accounts_ip_hash_slot_idx" ON "guest_accounts" USING btree ("ip_hash","slot");--> statement-breakpoint
CREATE UNIQUE INDEX "stripe_projects_grant_access_token_idx" ON "stripe_projects_grant" USING btree ("access_token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "stripe_projects_grant_refresh_token_idx" ON "stripe_projects_grant" USING btree ("refresh_token_hash");--> statement-breakpoint
CREATE INDEX "stripe_projects_grant_user_idx" ON "stripe_projects_grant" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "stripe_projects_resource_user_idx" ON "stripe_projects_resource" USING btree ("user_id");