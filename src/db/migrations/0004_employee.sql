CREATE SCHEMA "hr";
--> statement-breakpoint
CREATE TYPE "hr"."absence_type" AS ENUM('IN', 'OUT');--> statement-breakpoint
ALTER TYPE "core"."permission_action_type" SET SCHEMA "master";--> statement-breakpoint
CREATE TABLE "hr"."employee_absence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"absence_type" "hr"."absence_type",
	"date" timestamp,
	"lat" double precision,
	"lng" double precision,
	"distance" double precision,
	"work_location_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "hr"."employee_activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"media_url" text,
	"work_location_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."department" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar NOT NULL,
	"description" text,
	"company_id" uuid NOT NULL,
	"parent_department_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."employee_position_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"employee_position_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."employee_status_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"employee_status_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
CREATE TABLE "master"."work_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"description" text,
	"lat" double precision,
	"lng" double precision,
	"company_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
ALTER TABLE "core"."permission" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "core"."resource" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "core"."role_permission" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "core"."role" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "core"."permission" SET SCHEMA "master";
--> statement-breakpoint
ALTER TABLE "core"."resource" SET SCHEMA "master";
--> statement-breakpoint
ALTER TABLE "core"."role_permission" SET SCHEMA "master";
--> statement-breakpoint
ALTER TABLE "core"."role" SET SCHEMA "master";
--> statement-breakpoint
ALTER TABLE "core"."user_account" RENAME COLUMN "last_login" TO "last_login_at";--> statement-breakpoint
ALTER TABLE "master"."employee" RENAME COLUMN "status" TO "status_id";--> statement-breakpoint
ALTER TABLE "master"."employee_role" DROP CONSTRAINT "employee_role_role_id_role_id_fk";
--> statement-breakpoint
ALTER TABLE "master"."employee" DROP CONSTRAINT "employee_status_employee_status_id_fk";
--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "position_id" uuid;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "employee_number" varchar;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "device_id" varchar;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "join_date" date;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "out_date" date;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "face_embedding" text;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD COLUMN "department_id" uuid;--> statement-breakpoint
ALTER TABLE "hr"."employee_absence" ADD CONSTRAINT "employee_absence_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "master"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_absence" ADD CONSTRAINT "employee_absence_work_location_id_work_location_id_fk" FOREIGN KEY ("work_location_id") REFERENCES "master"."work_location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_absence" ADD CONSTRAINT "employee_absence_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_absence" ADD CONSTRAINT "employee_absence_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_absence" ADD CONSTRAINT "employee_absence_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_activity" ADD CONSTRAINT "employee_activity_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "master"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_activity" ADD CONSTRAINT "employee_activity_work_location_id_work_location_id_fk" FOREIGN KEY ("work_location_id") REFERENCES "master"."work_location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_activity" ADD CONSTRAINT "employee_activity_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_activity" ADD CONSTRAINT "employee_activity_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hr"."employee_activity" ADD CONSTRAINT "employee_activity_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."department" ADD CONSTRAINT "department_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."department" ADD CONSTRAINT "department_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."department" ADD CONSTRAINT "department_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."department" ADD CONSTRAINT "department_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."department" ADD CONSTRAINT "department_parent_department_id_department_id_fk" FOREIGN KEY ("parent_department_id") REFERENCES "master"."department"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position_history" ADD CONSTRAINT "employee_position_history_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "master"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position_history" ADD CONSTRAINT "employee_position_history_employee_position_id_employee_position_id_fk" FOREIGN KEY ("employee_position_id") REFERENCES "master"."employee_position"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position_history" ADD CONSTRAINT "employee_position_history_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position_history" ADD CONSTRAINT "employee_position_history_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_position_history" ADD CONSTRAINT "employee_position_history_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status_history" ADD CONSTRAINT "employee_status_history_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "master"."employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status_history" ADD CONSTRAINT "employee_status_history_employee_status_id_employee_status_id_fk" FOREIGN KEY ("employee_status_id") REFERENCES "master"."employee_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status_history" ADD CONSTRAINT "employee_status_history_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status_history" ADD CONSTRAINT "employee_status_history_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee_status_history" ADD CONSTRAINT "employee_status_history_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."work_location" ADD CONSTRAINT "work_location_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "core"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."work_location" ADD CONSTRAINT "work_location_created_by_user_account_id_fk" FOREIGN KEY ("created_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."work_location" ADD CONSTRAINT "work_location_updated_by_user_account_id_fk" FOREIGN KEY ("updated_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."work_location" ADD CONSTRAINT "work_location_deleted_by_user_account_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "core"."user_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "company_department_unique" ON "master"."department" USING btree (lower("code"),"company_id");--> statement-breakpoint
ALTER TABLE "master"."employee_role" ADD CONSTRAINT "employee_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "master"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_status_id_employee_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "master"."employee_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_position_id_employee_position_id_fk" FOREIGN KEY ("position_id") REFERENCES "master"."employee_position"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "master"."employee" ADD CONSTRAINT "employee_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "master"."department"("id") ON DELETE no action ON UPDATE no action;