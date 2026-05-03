import z from 'zod';

export const dbEnv = {
  URL: process.env.DB_URL,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT) || 5432,
  NAME: process.env.DB_NAME,
  SCHEMA: process.env.DB_SCHEMA,
};

export const dbEnvSchema = z.object({
  URL: z.string().nonempty(),
  USER: z.string().optional(),
  PASSWORD: z.string().optional(),
  HOST: z.string().optional(),
  PORT: z.coerce.number().optional(),
  NAME: z.string().optional(),
  SCHEMA: z.string().optional(),
});
