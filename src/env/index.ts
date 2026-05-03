import { config } from 'dotenv';

config();

import { appEnv, appEnvSchema } from '@/env/app.env';
import { dbEnv, dbEnvSchema } from '@/env/db.env';
import { jwtEnv, jwtEnvSchema } from '@/env/jwt.env';
import { InternalServerError } from '@/lib/error';

const Env = {
  ...appEnv,
  DB: dbEnv,
  JWT: jwtEnv,
} as const;

const envSchema = appEnvSchema.extend({
  DB: dbEnvSchema,
  JWT: jwtEnvSchema,
});

const schemaResult = envSchema.safeParse(Env);
if (!schemaResult.success) {
  const formattedError = schemaResult
    .error!.issues.map((err) => `${err.path.join('.')}: ${err.message}`)
    .join('\n');
  throw new InternalServerError('\n' + formattedError);
}

export { Env };
