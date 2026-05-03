import z from 'zod';

export const jwtEnv = {
  SECRET: process.env.JWT_SECRET,
  ACCESS_EXPIRES: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 300,
  REFRESH_EXPIRES: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 604800,
};

export const jwtEnvSchema = z.object({
  SECRET: z.string().nonempty(),
  ACCESS_EXPIRES: z.coerce.number().optional(),
  REFRESH_EXPIRES: z.coerce.number().optional(),
});
