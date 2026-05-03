const rbacMessage = [
  'ROLE_NOT_FOUND',
  'ROLE_ALREADY_EXIST',
  'ROLE_IS_REQUIRED',
  'USER_NO_ROLE',
  'PERMISSION_NOT_FOUND',
  'PERMISSION_ALREADY_EXIST',
  'USER_NO_PERMISSION',
  'USER_FORBIDDEN',
  'RESOURCE_NOT_FOUND',
  'RESOURCE_ALREADY_EXIST',
  'RESOURCE_IS_REQUIRED',
] as const;

export const RBACMessage = Object.fromEntries(
  rbacMessage.map((k) => [k, `message.rbac.${k.toLowerCase()}`])
) as {
  [K in (typeof rbacMessage)[number]]: string;
};
