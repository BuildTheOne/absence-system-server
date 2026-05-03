import { Message } from '@/constants/messages';
import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string({
      error: Message.USERNAME_REQUIRED,
    })
    .nonempty({
      error: Message.USERNAME_REQUIRED,
    }),
  email: z
    .email({
      error: Message.EMAIL_REQUIRED,
    })
    .nonempty({ error: Message.EMAIL_REQUIRED }),
  password: z
    .string({ error: Message.PASSWORD_REQUIRED })
    .nonempty({ error: Message.PASSWORD_REQUIRED }),
  companyCode: z
    .string({ error: Message.COMPANY_REQUIRED })
    .nonempty({ error: Message.COMPANY_REQUIRED }),
});
export type SignUpDto = z.infer<typeof signUpSchema>;
