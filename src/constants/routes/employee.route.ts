import { EmployeeModule } from '@/constants/modules/employee.module';

const { employee, ...modules } = EmployeeModule;

export const EmployeeRoute = Object.assign(
  employee.url,
  Object.fromEntries(
    Object.entries(modules).map(([key, value]) => [key, value.url])
  ) as {
    [K in keyof typeof modules]: string;
  }
);
