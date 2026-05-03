import {
  boolean,
  pgSchema,
  text,
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
  lastLogin: timestamp(),
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

export const roleTable = coreSchema.table('role', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  code: varchar().notNull().unique(),
  isAdmin: boolean('is_admin').default(false),
  description: text(),
  isActive: boolean().default(true),
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

export const resourceTable = coreSchema.table('resource', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  code: varchar().notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
  createdBy: uuid().references(() => userAccountTable.id),
  updatedBy: uuid().references(() => userAccountTable.id),
  deletedBy: uuid().references(() => userAccountTable.id),
});

export const permissionTable = coreSchema.table('permission', {
  id: uuid().defaultRandom().primaryKey(),
  code: varchar().notNull().unique(),
  actionType: permissionActionTypeEnum(),
  resourceId: uuid()
    .notNull()
    .references(() => resourceTable.id),
  description: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
  createdBy: uuid().references(() => userAccountTable.id),
  updatedBy: uuid().references(() => userAccountTable.id),
  deletedBy: uuid().references(() => userAccountTable.id),
});

export const rolePermissionTable = coreSchema.table('role_permission', {
  id: uuid().defaultRandom().primaryKey(),
  roleId: uuid()
    .notNull()
    .references(() => roleTable.id),
  permissionId: uuid()
    .notNull()
    .references(() => permissionTable.id),
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
