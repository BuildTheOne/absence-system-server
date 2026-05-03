CREATE SCHEMA "core";
--> statement-breakpoint
CREATE TYPE "core"."permission_action_type" AS ENUM('CREATE', 'READ', 'UPDATE', 'DELETE');--> statement-breakpoint
CREATE TABLE "core"."company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "company_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "core"."user_account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login" timestamp,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "user_account_username_unique" UNIQUE("username"),
	CONSTRAINT "user_account_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "core"."user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"display_name" varchar NOT NULL,
	"profile_photo" varchar,
	"company_id" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "core"."user_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"refresh_token" varchar NOT NULL,
	"expired_at" timestamp NOT NULL,
	"company_id" uuid NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "core"."user_account" ADD CONSTRAINT "user_account_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_profile" ADD CONSTRAINT "user_profile_user_id_user_account_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_profile" ADD CONSTRAINT "user_profile_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_profile" ADD CONSTRAINT "user_profile_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_profile" ADD CONSTRAINT "user_profile_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_profile" ADD CONSTRAINT "user_profile_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_session" ADD CONSTRAINT "user_session_user_id_user_account_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_session" ADD CONSTRAINT "user_session_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_session" ADD CONSTRAINT "user_session_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_session" ADD CONSTRAINT "user_session_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."user_session" ADD CONSTRAINT "user_session_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;