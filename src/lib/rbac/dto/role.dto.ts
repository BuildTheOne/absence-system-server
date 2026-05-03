import { roleTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

export const roleSchema = createInsertSchema(roleTable).pick({
  id: true,
  name: true,
  code: true,
  isActive: true,
  companyId: true,
});
export type RoleDto = z.infer<typeof roleSchema>;

export const createRoleSchema = roleSchema.pick({
  name: true,
});
export type CreateRoleDto = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = roleSchema.pick({
  name: true,
  isActive: true,
});
export type UpdateRoleDto = z.infer<typeof updateRoleSchema>;
