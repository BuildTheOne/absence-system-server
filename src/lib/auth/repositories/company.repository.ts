import { companyTable } from '@/db/schema';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { eq } from 'drizzle-orm';

const findCompanyByCodeRepository = catchAsyncRepository(
  async (code: string) => {
    const whereClause = buildWhereClause({
      table: companyTable,
      andClause: [eq(companyTable.isActive, true), eq(companyTable.name, code)],
    });

    const data = await db.select().from(companyTable).where(whereClause);
    return data;
  }
);

export const CompanyRepository = {
  findByCode: findCompanyByCodeRepository,
};
