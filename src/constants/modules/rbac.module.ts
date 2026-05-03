import { Module } from '@/constants/modules/Module';

const role: Module = {
  name: 'Role',
  url: '/role',
  label: 'module.rbac.role.title',
  desc: 'module.rbac.role.description',
};

export const RBACModule = {
  role: role,
};
