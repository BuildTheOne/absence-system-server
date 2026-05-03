import { employeeRoleTable, roleTable } from '@/db/schema';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsync } from '@/lib/error';
import { RoleDto } from '@/lib/rbac/dto/role.dto';
import { eq, sql } from 'drizzle-orm';

const findAllRoleRepository = catchAsync(async () => {
  const whereClause = buildWhereClause({
    table: roleTable,
    andClause: [eq(roleTable.isActive, true)],
  });

  const data = await db.select().from(roleTable).where(whereClause);
  return data;
});

const findRoleByIdRepository = catchAsync(async (roleId: string) => {
  const whereClause = buildWhereClause({
    table: roleTable,
    andClause: [eq(roleTable.id, roleId), eq(roleTable.isActive, true)],
  });

  const data = await db.select().from(roleTable).where(whereClause).limit(1);
  return data[0];
});

const findRoleByEmployeeIdRepository = catchAsync(
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

const createRoleRepository = catchAsync(async (data: RoleDto) => {
  const createdData = await db
    .insert(roleTable)
    .values({
      ...data,
    })
    .returning();

  return createdData[0];
});

const updateRoleRepository = catchAsync(
  async (roleId: string, data: RoleDto) => {
    const whereClause = buildWhereClause({
      table: roleTable,
      andClause: [eq(roleTable.id, roleId), eq(roleTable.isActive, true)],
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

const deleteRoleRepository = catchAsync(async (roleId: string) => {
  const whereClause = buildWhereClause({
    table: roleTable,
    andClause: [eq(roleTable.id, roleId), eq(roleTable.isActive, true)],
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
