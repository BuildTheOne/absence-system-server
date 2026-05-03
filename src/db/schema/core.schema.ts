import {
  baseFields,
  companyFields,
  timestampFields,
} from '@/db/schema/shared/base.schema';
import {
  boolean,
  pgSchema,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const coreSchema = pgSchema('core');

export const permissionActionTypeEnum = coreSchema.enum(
  'permission_action_type',
  ['CREATE', 'READ', 'UPDATE', 'DELETE']
);

export const companyTable = coreSchema.table('company', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  code: varchar().notNull().unique(),
  isActive: boolean().default(true),
  ...timestampFields,
});

export const userAccountTable = coreSchema.table('user_account', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  email: varchar().notNull().unique(),
  isActive: boolean().notNull().default(true),
  lastLogin: timestamp(),
  ...companyFields,
  ...timestampFields,
});

export const userSessionTable = coreSchema.table('user_session', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
  refreshToken: varchar().notNull(),
  expiredAt: timestamp().notNull(),
  ...baseFields,
});

export const userProfileTable = coreSchema.table('user_profile', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
  displayName: varchar().notNull(),
  profilePhoto: varchar(),
  ...baseFields,
});
