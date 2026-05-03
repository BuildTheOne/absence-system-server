import { Message } from '@/constants/messages';
import { z } from 'zod';

export const signInSchema = z.object({
  username: z
    .string({
      error: Message.EMAIL_OR_USERNAME_REQUIRED,
    })
    .nonempty({
      error: Message.EMAIL_OR_USERNAME_REQUIRED,
    }),
  password: z
    .string({ error: Message.PASSWORD_REQUIRED })
    .nonempty({ error: Message.PASSWORD_REQUIRED }),
});
export type SignInDto = z.infer<typeof signInSchema>;
