import { employeeTable } from '@/db/schema';
import {
  buildCompanyFilter,
  buildWhereClause,
  db,
  QueryParamFilter,
} from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { eq, sql } from 'drizzle-orm';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';

const findAllEmployeeRepository = catchAsyncRepository(
  async (filter: QueryParamFilter) => {
    const { company: companyFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [...buildCompanyFilter(employeeTable, companyFilter)],
    });

    const data = await db.select().from(employeeTable).where(whereClause);
    return data;
  }
);

const findEmployeeByIdRepository = catchAsyncRepository(
  async (id: string, filter: QueryParamFilter) => {
    const { company: companyFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [
        ...buildCompanyFilter(employeeTable, companyFilter),
        eq(employeeTable.id, id),
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

const createEmployeeRepository = catchAsyncRepository(
  async (data: CreateEmployeeDto, filter: QueryParamFilter) => {
    const { company: companyFilter, user: userFilter } = filter;

    const createdData = await db
      .insert(employeeTable)
      .values({
        ...data,
        userId: userFilter.userId,
        companyId: companyFilter.companyId,
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString()
          : null,
        joinDate: sql`CURRENT_TIMESTAMP`,
        outDate: null,
        createdAt: sql`CURRENT_TIMESTAMP`,
        createdBy: userFilter.userId,
      })
      .returning();

    return createdData[0];
  }
);

const updateEmployeeRepository = catchAsyncRepository(
  async (id: string, data: UpdateEmployeeDto, filter: QueryParamFilter) => {
    const { user: userFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [eq(employeeTable.id, id), eq(employeeTable.isActive, true)],
    });

    const updatedData = await db
      .update(employeeTable)
      .set({
        ...data,
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString()
          : null,
        outDate: data.outDate ? new Date(data.outDate).toISOString() : null,
        isActive: !data.outDate,
        updatedAt: sql`CURRENT_TIMESTAMP`,
        updatedBy: userFilter.userId,
      })
      .where(whereClause)
      .returning();

    return updatedData[0];
  }
);

const deleteEmployeeRepository = catchAsyncRepository(
  async (id: string, filter: QueryParamFilter) => {
    const { user: userFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [eq(employeeTable.id, id), eq(employeeTable.isActive, true)],
    });

    const updatedData = await db
      .update(employeeTable)
      .set({
        isActive: false,
        deletedAt: sql`CURRENT_TIMESTAMP`,
        deletedBy: userFilter.userId,
      })
      .where(whereClause)
      .returning();

    return updatedData[0];
  }
);

export const EmployeeRepository = {
  findAll: findAllEmployeeRepository,
  findById: findEmployeeByIdRepository,
  create: createEmployeeRepository,
  update: updateEmployeeRepository,
  delete: deleteEmployeeRepository,
};
