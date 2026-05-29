import { PermissionActionList } from './utils';

const RolePermission = Object.fromEntries(
  PermissionActionList.map((k) => [k, `role.${k}`])
) as {
  [K in (typeof PermissionActionList)[number]]: string;
};

export const RBACPermission = {
  role: RolePermission,
};