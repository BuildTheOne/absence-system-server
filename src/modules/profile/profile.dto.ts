import { userProfileTable } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';

export const userProfileDto = createSelectSchema(userProfileTable)
  .pick({
    displayName: true,
    profilePhoto: true,
    companyId: true,
  })
  .extend({
    username: z.string(),
    email: z.string(),
    companyName: z.string(),
  });
export type UserProfileDto = z.infer<typeof userProfileDto>;
