import { employeeAbsenceTable } from '@/db/schema';
import {
  buildCompanyData,
  buildCompanyFilter,
  buildUserData,
  buildWhereClause,
  db,
  QueryParam,
} from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { eq, sql } from 'drizzle-orm';
import { CreateEmployeeAbsenceDto } from '../dto/employee-absence.dto';

const findAllEmployeeAbsenceRepository = catchAsyncRepository(
  async (filter: QueryParam) => {
    const { company: companyFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeAbsenceTable,
      andClause: [...buildCompanyFilter(employeeAbsenceTable, companyFilter)],
    });

    const data = await db
      .select()
      .from(employeeAbsenceTable)
      .where(whereClause);

    return data;
  }
);

const findEmployeeAbsenceByEmployeeIdRepository = catchAsyncRepository(
  async (employeeId: string, filter: QueryParam) => {
    const { company: companyFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeAbsenceTable,
      andClause: [
        ...buildCompanyFilter(employeeAbsenceTable, companyFilter),
        eq(employeeAbsenceTable.employeeId, employeeId),
      ],
    });

    const data = await db
      .select()
      .from(employeeAbsenceTable)
      .where(whereClause);

    return data;
  }
);

const findEmployeeAbsenceByIdRepository = catchAsyncRepository(
  async (id: string, filter: QueryParam) => {
    const { company: companyFilter } = filter;

    const whereClause = buildWhereClause({
      table: employeeAbsenceTable,
      andClause: [
        ...buildCompanyFilter(employeeAbsenceTable, companyFilter),
        eq(employeeAbsenceTable.id, id),
      ],
    });

    const data = await db
      .select()
      .from(employeeAbsenceTable)
      .where(whereClause)
      .limit(1);

    return data[0];
  }
);

const createEmployeeAbsenceRepository = catchAsyncRepository(
  async (data: CreateEmployeeAbsenceDto, filter: QueryParam) => {
    const { company: companyFilter, user: userFilter } = filter;
    const companyData = buildCompanyData(companyFilter);
    const userData = buildUserData(userFilter, 'CREATE');

    const createdData = await db
      .insert(employeeAbsenceTable)
      .values({
        ...data,
        date: sql`CURRENT_TIMESTAMP`,
        ...companyData,
        ...userData,
      })
      .returning();

    return createdData[0];
  }
);

export const EmployeeAbsenceRepository = {
  findAll: findAllEmployeeAbsenceRepository,
  findById: findEmployeeAbsenceByIdRepository,
  findByEmployeeId: findEmployeeAbsenceByEmployeeIdRepository,
  create: createEmployeeAbsenceRepository,
};
