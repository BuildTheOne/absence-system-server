import { employeeRoleTable, roleTable } from '@/db/schema';
import {
  buildCompanyFilter,
  buildWhereClause,
  CompanyFilter,
  db,
} from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { RoleDto } from '@/lib/rbac/dto/role.dto';
import { eq, sql } from 'drizzle-orm';

const findAllRoleRepository = catchAsyncRepository(
  async (companyFilter: CompanyFilter) => {
    const whereClause = buildWhereClause({
      table: roleTable,
      andClause: [
        ...buildCompanyFilter(roleTable, companyFilter),
        eq(roleTable.isActive, true),
      ],
    });

    const data = await db.select().from(roleTable).where(whereClause);
    return data;
  }
);

const findRoleByIdRepository = catchAsyncRepository(
  async (id: string, companyFilter: CompanyFilter) => {
    const whereClause = buildWhereClause({
      table: roleTable,
      andClause: [
        ...buildCompanyFilter(roleTable, companyFilter),
        eq(roleTable.id, id),
        eq(roleTable.isActive, true),
      ],
    });

    const data = await db.select().from(roleTable).where(whereClause).limit(1);
    return data[0];
  }
);

const findRoleByEmployeeIdRepository = catchAsyncRepository(
  async (employeeId: string) => {
    const whereClause = buildWhereClause({
      table: employeeRoleTable,
      andClause: [eq(employeeRoleTable.employeeId, employeeId)],
    });

    const data = await db
      .select()
      .from(roleTable)
      .leftJoin(employeeRoleTable, eq(employeeRoleTable.roleId, roleTable.id))
      .where(whereClause);

    return data.map((d) => d.role);
  }
);

const createRoleRepository = catchAsyncRepository(async (data: RoleDto) => {
  const createdData = await db
    .insert(roleTable)
    .values({
      ...data,
    })
    .returning();

  return createdData[0];
});

const updateRoleRepository = catchAsyncRepository(
  async (id: string, data: RoleDto) => {
    const whereClause = buildWhereClause({
      table: roleTable,
      andClause: [eq(roleTable.id, id), eq(roleTable.isActive, true)],
    });

    const updatedData = await db
      .update(roleTable)
      .set({
        ...data,
      })
      .where(whereClause)
      .returning();

    return updatedData[0];
  }
);

const deleteRoleRepository = catchAsyncRepository(async (id: string) => {
  const whereClause = buildWhereClause({
    table: roleTable,
    andClause: [eq(roleTable.id, id), eq(roleTable.isActive, true)],
  });

  const updatedData = await db
    .update(roleTable)
    .set({
      deletedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(whereClause)
    .returning();

  return updatedData[0];
});

export const RoleRepository = {
  findAll: findAllRoleRepository,
  findById: findRoleByIdRepository,
  findByEmployeeId: findRoleByEmployeeIdRepository,
  create: createRoleRepository,
  update: updateRoleRepository,
  delete: deleteRoleRepository,
};
