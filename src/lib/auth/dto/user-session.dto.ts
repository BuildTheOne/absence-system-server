import { userSessionTable } from '@/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

export const createUserSessionSchema = createInsertSchema(
  userSessionTable
).pick({
  id: true,
  userId: true,
  refreshToken: true,
  expiredAt: true,
  companyId: true,
});
export type CreateUserSessionDto = z.infer<typeof createUserSessionSchema>;
