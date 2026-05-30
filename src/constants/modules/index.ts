import { AuthModule } from './auth.module';
import { EmployeeModule } from './employee.module';
import { Module as IModule } from './Module';
import { ProfileModule } from './profile.module';
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
  profile: ProfileModule,
  employee: EmployeeModule,
} as const;
