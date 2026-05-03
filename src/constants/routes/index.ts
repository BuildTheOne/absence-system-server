import { Module } from '@/constants/modules';
import { AuthRoute } from '@/constants/routes/auth.route';

export const Route = {
  main: Module.main.url,
  auth: AuthRoute,
};
