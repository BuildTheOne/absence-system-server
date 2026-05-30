import { employeeAbsenceTable } from '@/db/schema/hr.schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';
import { EmployeeDto } from './employee.dto';

export const employeeAbsenceSchema = createInsertSchema(employeeAbsenceTable)
  .pick({
    id: true,
    employeeId: true,
    absenceType: true,
    date: true,
    lat: true,
    lng: true,
  })
  .extend({
    date: z.coerce.date().nullish(),
  });
export type EmployeeAbsenceDto = z.infer<typeof employeeAbsenceSchema>;

export const createEmployeeAbsenceSchema = employeeAbsenceSchema.pick({
  employeeId: true,
  absenceType: true,
  lat: true,
  lng: true,
});
export type CreateEmployeeAbsenceDto = z.infer<
  typeof createEmployeeAbsenceSchema
>;
