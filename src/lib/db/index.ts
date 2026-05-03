import * as schema from '@/db/schema';
import { Env } from '@/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
export * from './utils';

const pool = new Pool({
  connectionString: Env.DB.URL,
});

export const db = drizzle(pool, {
  schema,
  casing: 'snake_case',
});
