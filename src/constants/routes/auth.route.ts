import { AuthModule } from '@/constants/modules/auth.module';

const { auth, ...modules } = AuthModule;

export const AuthRoute = Object.assign(
  auth.url,
  Object.fromEntries(
    Object.entries(modules).map(([key, value]) => [key, value.url])
  ) as {
    [K in keyof typeof modules]: string;
  }
);
