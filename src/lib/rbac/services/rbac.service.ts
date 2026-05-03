import { Message } from '@/constants/messages';
import { getUser } from '@/lib/auth';
import { ForbiddenError, NotFoundError } from '@/lib/error';
import { EmployeeRepository } from '@/lib/rbac/repositories/employee.repository';
import { PermissionRepository } from '@/lib/rbac/repositories/permission.repository';
import { RoleRepository } from '@/lib/rbac/repositories/role.repository';
import { Request } from 'express';

export async function verifyPermission(req: Request, permission: string) {
  const user = await getUser(req);

  if (!user) {
    throw new NotFoundError(Message.USER_NOT_FOUND);
  }

  const employee = await EmployeeRepository.findByUserId(user.id);

  if (!employee) {
    throw new ForbiddenError(Message.USER_NOT_EMPLOYEE);
  }

  const roleList = await RoleRepository.findByEmployeeId(employee.id);

  if (roleList.length === 0) {
    throw new ForbiddenError(Message.USER_NO_ROLE);
  }

  const permissionList = await PermissionRepository.findByRoleIds(
    roleList.map((role) => role.id)
  );

  if (permissionList.length === 0) {
    throw new ForbiddenError(Message.USER_NO_PERMISSION);
  }

  const permissionMap = new Map<string, string>();
  for (const permission of permissionList) {
    permissionMap.set(permission.code, permission.code);
  }

  if (!permissionMap.get(permission)) {
    throw new ForbiddenError();
  }

  return true;
}
