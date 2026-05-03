import { Module } from '@/constants/modules';
import { AuthRoute } from './auth.route';
import { MasterRoute } from './master.route';
import { RBACRoute } from './rbac.route';

export const Route = {
  main: Module.main.url,
  auth: AuthRoute,
  rbac: RBACRoute,
  master: MasterRoute,
};
