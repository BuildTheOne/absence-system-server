CREATE SCHEMA "master";
--> statement-breakpoint
CREATE TYPE "master"."gender" AS ENUM('M', 'F');--> statement-breakpoint
CREATE TABLE "core"."permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar NOT NULL,
	"action_type" "core"."permission_action_type",
	"resource_id" uuid NOT NULL,
	"description" text,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	CONSTRAINT "permission_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "core"."resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	CONSTRAINT "resource_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "core"."role_permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "core"."role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"is_admin" boolean DEFAULT false,
	"description" text,
	"is_active" boolean DEFAULT true,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	CONSTRAINT "role_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "master"."employee_position" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"description" text,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."employee_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."employee_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."employee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"birth_place" varchar,
	"birth_date" date,
	"gender" "master"."gender",
	"address" text,
	"is_active" boolean DEFAULT true,
	"status" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
ALTER TABLE "core"."permission" ADD CONSTRAINT "permission_resource_id_resource_id_fk" FOREIGN KEY ("resource_id") REFERENCES "core"."resource"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."permission" ADD CONSTRAINT "permission_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."permission" ADD CONSTRAINT "permission_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."permission" ADD CONSTRAINT "permission_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."permission" ADD CONSTRAINT "permission_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."resource" ADD CONSTRAINT "resource_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."resource" ADD CONSTRAINT "resource_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."resource" ADD CONSTRAINT "resource_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."resource" ADD CONSTRAINT "resource_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "core"."permission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role_permission" ADD CONSTRAINT "role_permission_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role" ADD CONSTRAINT "role_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role" ADD CONSTRAINT "role_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role" ADD CONSTRAINT "role_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "core"."role" ADD CONSTRAINT "role_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position" ADD CONSTRAINT "employee_position_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position" ADD CONSTRAINT "employee_position_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position" ADD CONSTRAINT "employee_position_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position" ADD CONSTRAINT "employee_position_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "master"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status" ADD CONSTRAINT "employee_status_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status" ADD CONSTRAINT "employee_status_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status" ADD CONSTRAINT "employee_status_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status" ADD CONSTRAINT "employee_status_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_status_employee_status_id_fk" FOREIGN KEY ("status") REFERENCES "master"."employee_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_user_id_user_account_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "company_employee_position_unique" ON "master"."employee_position" USING btree (lower("code"),"company_id");--> statement-breakpoint
CREATE UNIQUE INDEX "company_employee_status_unique" ON "master"."employee_status" USING btree (lower("name"),"company_id");