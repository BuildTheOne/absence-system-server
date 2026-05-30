import {
  boolean,
  pgSchema,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const coreSchema = pgSchema('core');

export const companyTable = coreSchema.table('company', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  code: varchar().notNull().unique(),
  isActive: boolean().default(true),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
});

export const userAccountTable = coreSchema.table('user_account', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar().notNull().unique(),
  password: varchar().notNull(),
  email: varchar().notNull().unique(),
  isActive: boolean().notNull().default(true),
  lastLoginAt: timestamp(),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
});

export const userSessionTable = coreSchema.table('user_session', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
  refreshToken: varchar().notNull(),
  expiredAt: timestamp().notNull(),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
  createdBy: uuid().references(() => userAccountTable.id),
  updatedBy: uuid().references(() => userAccountTable.id),
  deletedBy: uuid().references(() => userAccountTable.id),
});

export const userProfileTable = coreSchema.table('user_profile', {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
  displayName: varchar().notNull(),
  profilePhoto: varchar(),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
  createdBy: uuid().references(() => userAccountTable.id),
  updatedBy: uuid().references(() => userAccountTable.id),
  deletedBy: uuid().references(() => userAccountTable.id),
});
