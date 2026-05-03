import { RBACModule } from '@/constants/modules/rbac.module';

export const RBACRoute = Object.fromEntries(
  Object.entries(RBACModule).map(([key, value]) => [key, value.url])
) as {
  [K in keyof typeof RBACModule]: string;
};
