import { Module } from '@/constants/modules';
import { AuthRoute } from './auth.route';
import { EmployeeRoute } from './employee.route';
import { ProfileRoute } from './profile.route';
import { RBACRoute } from './rbac.route';

export const Route = {
  main: Module.main.url,
  auth: AuthRoute,
  rbac: RBACRoute,
  profile: ProfileRoute,
  employee: EmployeeRoute,
};
