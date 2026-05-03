ALTER TABLE "core"."resource" DROP CONSTRAINT "resource_company_id_company_id_fk";
--> statement-breakpoint
ALTER TABLE "core"."resource" DROP COLUMN "company_id";