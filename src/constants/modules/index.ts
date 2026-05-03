import { AuthModule } from './auth.module';
import { Module as IModule } from './Module';

const mainModule: IModule = {
  name: 'absence-system',
  url: '/',
  label: 'module.main.title',
  desc: 'module.main.description',
};

export const Module = {
  main: mainModule,
  auth: AuthModule,
} as const;
