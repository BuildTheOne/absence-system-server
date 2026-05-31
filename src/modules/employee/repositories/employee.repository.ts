import { employeeTable } from '@/db/schema';
import {
  buildCompanyData,
  buildCompanyFilter,
  buildPaginationQuery,
  buildUserData,
  buildWhereClause,
  db,
  QueryParam,
} from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { count, eq, sql } from 'drizzle-orm';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';

const findAllEmployeeRepository = catchAsyncRepository(
  async (filter: QueryParam) => {
    const {
      company: companyFilter,
      pagination: paginationParam,
      search: searchParam,
    } = filter;

    const query = db.select().from(employeeTable).$dynamic();

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [...buildCompanyFilter(employeeTable, companyFilter)],
      search: searchParam,
      searchField: ['name'],
    });

    const queryPaginated = buildPaginationQuery({
      query,
      page: paginationParam?.page,
      pageSize: paginationParam?.pageSize,
    });

    const data = await queryPaginated.where(whereClause);

    const [total] = await db
      .select({ count: count() })
      .from(employeeTable)
      .where(whereClause);

    return { data, total: total.count };
  }
);

const findEmployeeByIdRepository = catchAsyncRepository(
  async (id: string, filter: QueryParam) => {
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
  async (data: CreateEmployeeDto, filter: QueryParam) => {
    const { company: companyFilter, user: userFilter } = filter;
    const companyData = buildCompanyData(companyFilter);
    const userData = buildUserData(userFilter, 'CREATE');

    const createdData = await db
      .insert(employeeTable)
      .values({
        ...data,
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString()
          : null,
        joinDate: sql`CURRENT_TIMESTAMP`,
        outDate: null,
        ...companyData,
        ...userData,
      })
      .returning();

    return createdData[0];
  }
);

const updateEmployeeRepository = catchAsyncRepository(
  async (id: string, data: UpdateEmployeeDto, filter: QueryParam) => {
    const { user: userFilter } = filter;
    const userData = buildUserData(userFilter, 'UPDATE');

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
        ...userData,
      })
      .where(whereClause)
      .returning();

    return updatedData[0];
  }
);

const deleteEmployeeRepository = catchAsyncRepository(
  async (id: string, filter: QueryParam) => {
    const { user: userFilter } = filter;
    const userData = buildUserData(userFilter, 'DELETE');

    const whereClause = buildWhereClause({
      table: employeeTable,
      andClause: [eq(employeeTable.id, id), eq(employeeTable.isActive, true)],
    });

    const updatedData = await db
      .update(employeeTable)
      .set({
        isActive: false,
        ...userData,
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
