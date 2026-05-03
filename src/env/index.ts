import { config } from 'dotenv';

config();

import { appEnv, appEnvSchema } from '@/env/app.env';
import { InternalServerError } from '@/lib/error';

const Env = {
  ...appEnv,
} as const;

const envSchema = appEnvSchema.extend({});

const schemaResult = envSchema.safeParse(Env);
if (!schemaResult.success) {
  const formattedError = schemaResult
    .error!.issues.map((err) => `${err.path.join('.')}: ${err.message}`)
    .join('\n');
  throw new InternalServerError('\n' + formattedError);
}

export { Env };
