import z from 'zod';

export const appEnv = {
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
};

export const appEnvSchema = z.object({
  BASE_URL: z.string().nonempty(),
  NODE_ENV: z.enum(['development', 'stagging', 'production', 'test']),
  PORT: z.string().nonempty(),
});
