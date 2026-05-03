import { Module as IModule } from '@/constants/modules/Module';

const mainModule: IModule = {
  name: 'absence-system',
  url: '/',
  label: 'module.main.title',
  desc: 'module.main.description',
};

export const Module = {
  main: mainModule,
} as const;
