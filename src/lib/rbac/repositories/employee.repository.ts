import { employeeTable } from '@/db/schema';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { eq } from 'drizzle-orm';

const findEmployeeByUserIdRepository = catchAsyncRepository(
  async (userId: string) => {
    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [
        eq(employeeTable.userId, userId),
        eq(employeeTable.isActive, true),
      ],
    });

    const data = await db
      .select()
      .from(employeeTable)
      .where(whereClause)
      .limit(1);

    return data[0];
  }
);

export const EmployeeRepository = {
  findByUserId: findEmployeeByUserIdRepository,
};
