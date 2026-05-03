import { PermissionActionList } from '@/constants/permissions/utils';

export const RolePermission = Object.fromEntries(
  PermissionActionList.map((k) => [k, `role.${k}`])
) as {
  [K in (typeof PermissionActionList)[number]]: string;
};
