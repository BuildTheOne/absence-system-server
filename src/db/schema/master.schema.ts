import {
  companyTable,
  roleTable,
  userAccountTable,
} from '@/db/schema/core.schema';
import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const masterSchema = pgSchema('master');

export const genderEnum = masterSchema.enum('gender', ['M', 'F']);

export const employeeTable = masterSchema.table('employee', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  birthPlace: varchar(),
  birthDate: date(),
  gender: genderEnum(),
  address: text(),
  isActive: boolean().default(true),
  status: uuid()
    .notNull()
    .references(() => employeeStatusTable.id),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
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

export const employeeStatusTable = masterSchema.table(
  'employee_status',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    companyId: uuid()
      .notNull()
      .references(() => companyTable.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    createdBy: uuid().references(() => userAccountTable.id),
    updatedBy: uuid().references(() => userAccountTable.id),
    deletedBy: uuid().references(() => userAccountTable.id),
  },
  (table) => [
    uniqueIndex('company_employee_status_unique').on(
      sql`lower(${table.name})`,
      table.companyId
    ),
  ]
);

export const employeePositionTable = masterSchema.table(
  'employee_position',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    code: varchar().notNull(),
    description: text(),
    companyId: uuid()
      .notNull()
      .references(() => companyTable.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    createdBy: uuid().references(() => userAccountTable.id),
    updatedBy: uuid().references(() => userAccountTable.id),
    deletedBy: uuid().references(() => userAccountTable.id),
  },
  (table) => [
    uniqueIndex('company_employee_position_unique').on(
      sql`lower(${table.code})`,
      table.companyId
    ),
  ]
);

export const employeeRoleTable = masterSchema.table('employee_role', {
  id: uuid().defaultRandom().primaryKey(),
  roleId: uuid()
    .notNull()
    .references(() => roleTable.id),
  employeeId: uuid()
    .notNull()
    .references(() => employeeTable.id),
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
