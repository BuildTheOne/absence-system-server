import { employeeTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { EmployeeAbsenceDto } from './employee-absence.dto';

export const employeeSchema = createInsertSchema(employeeTable)
  .pick({
    id: true,
    name: true,
    birthPlace: true,
    birthDate: true,
    gender: true,
    address: true,
    isActive: true,
    companyId: true,
    positionId: true,
    employeeNumber: true,
    deviceId: true,
    joinDate: true,
    outDate: true,
    faceEmbedding: true,
    departmentId: true,
    statusId: true,
    userId: true,
  })
  .extend({
    birthDate: z.coerce.date().nullish(),
    joinDate: z.coerce.date().nullish(),
    outDate: z.coerce.date().nullish(),
  });
export type EmployeeDto = z.infer<typeof employeeSchema> & {
  absence: EmployeeAbsenceDto[];
};

export const createEmployeeSchema = employeeSchema.pick({
  name: true,
  employeeNumber: true,
  birthDate: true,
  birthPlace: true,
  gender: true,
  address: true,
  departmentId: true,
  statusId: true,
  positionId: true,
  userId: true,
});
export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;

export const updateEmployeeSchema = employeeSchema.pick({
  name: true,
  isActive: true,
  birthDate: true,
  birthPlace: true,
  gender: true,
  address: true,
  departmentId: true,
  outDate: true,
  statusId: true,
  positionId: true,
});
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema>;
