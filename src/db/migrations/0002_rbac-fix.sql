ALTER TABLE "core"."permission" DROP CONSTRAINT "permission_company_id_company_id_fk";
--> statement-breakpoint
ALTER TABLE "core"."permission" DROP COLUMN "company_id";