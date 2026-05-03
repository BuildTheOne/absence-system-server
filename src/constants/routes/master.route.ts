import { MasterModule } from '@/constants/modules/master.module';

const { master, ...modules } = MasterModule;

export const MasterRoute = Object.assign(
  master.url,
  Object.fromEntries(
    Object.entries(modules).map(([key, value]) => [key, value.url])
  ) as {
    [K in keyof typeof modules]: string;
  }
);
