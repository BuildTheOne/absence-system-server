import { AuthModule } from './auth.module';
import { MasterModule } from './master.module';
import { Module as IModule } from './Module';
import { RBACModule } from './rbac.module';

const mainModule: IModule = {
  name: 'absence-system',
  url: '/',
  label: 'module.main.title',
  desc: 'module.main.description',
};

export const Module = {
  main: mainModule,
  auth: AuthModule,
  rbac: RBACModule,
  master: MasterModule,
} as const;
