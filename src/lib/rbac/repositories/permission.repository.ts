import { permissionTable, rolePermissionTable } from '@/db/schema';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsync } from '@/lib/error';
import { eq, inArray } from 'drizzle-orm';

const findAllPermissionRepository = catchAsync(async () => {
  const whereClause = buildWhereClause({
    table: permissionTable,
  });

  const data = await db.select().from(permissionTable).where(whereClause);
  return data;
});

const findPermissionByRoleIdsRepository = catchAsync(
  async (roleIds: string[]) => {
    const whereClause = buildWhereClause({
      table: rolePermissionTable,
      andClause: [inArray(rolePermissionTable.roleId, roleIds)],
    });

    const data = await db
      .select()
      .from(permissionTable)
      .leftJoin(
        rolePermissionTable,
        eq(rolePermissionTable.permissionId, permissionTable.id)
      )
      .where(whereClause);

    return data.map((d) => d.permission);
  }
);

export const PermissionRepository = {
  findAll: findAllPermissionRepository,
  findByRoleIds: findPermissionByRoleIdsRepository,
};
