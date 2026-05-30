import { companyTable, userAccountTable } from '@/db/schema/core.schema';
import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  doublePrecision,
  foreignKey,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const masterSchema = pgSchema('master');

export const permissionActionTypeEnum = masterSchema.enum(
  'permission_action_type',
  ['CREATE', 'READ', 'UPDATE', 'DELETE']
);

export const genderEnum = masterSchema.enum('gender', ['M', 'F']);

export const employeeTable = masterSchema.table('employee', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar().notNull(),
  birthPlace: varchar(),
  birthDate: date(),
  gender: genderEnum(),
  address: text(),
  isActive: boolean().default(true),
  statusId: uuid().references(() => employeeStatusTable.id),
  positionId: uuid().references(() => employeePositionTable.id),
  userId: uuid()
    .notNull()
    .references(() => userAccountTable.id),
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
  employeeNumber: varchar(),
  deviceId: varchar(),
  joinDate: date(),
  outDate: date(),
  faceEmbedding: text(),
  departmentId: uuid().references(() => departmentTable.id),
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

export const employeeStatusHistoryTable = masterSchema.table(
  'employee_status_history',
  {
    id: uuid().defaultRandom().primaryKey(),
    employeeId: uuid()
      .notNull()
      .references(() => employeeTable.id),
    employeeStatusId: uuid()
      .notNull()
      .references(() => employeeStatusTable.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    createdBy: uuid().references(() => userAccountTable.id),
    updatedBy: uuid().references(() => userAccountTable.id),
    deletedBy: uuid().references(() => userAccountTable.id),
  }
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

export const employeePositionHistoryTable = masterSchema.table(
  'employee_position_history',
  {
    id: uuid().defaultRandom().primaryKey(),
    employeeId: uuid()
      .notNull()
      .references(() => employeeTable.id),
    employeePositionId: uuid()
      .notNull()
      .references(() => employeePositionTable.id),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    createdBy: uuid().references(() => userAccountTable.id),
    updatedBy: uuid().references(() => userAccountTable.id),
    deletedBy: uuid().references(() => userAccountTable.id),
  }
);

export const departmentTable = masterSchema.table(
  'department',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    code: varchar().notNull(),
    description: text(),
    companyId: uuid()
      .notNull()
      .references(() => companyTable.id),
    parentDepartmentId: uuid(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
    createdBy: uuid().references(() => userAccountTable.id),
    updatedBy: uuid().references(() => userAccountTable.id),
    deletedBy: uuid().references(() => userAccountTable.id),
  },
  (table) => [
    uniqueIndex('company_department_unique').on(
      sql`lower(${table.code})`,
      table.companyId
    ),
    foreignKey({
      columns: [table.parentDepartmentId],
      foreignColumns: [table.id],
    }),
  ]
);

export const roleTable = masterSchema.table('role', {
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

export const resourceTable = masterSchema.table('resource', {
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

export const permissionTable = masterSchema.table('permission', {
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

export const rolePermissionTable = masterSchema.table('role_permission', {
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

export const workLocationTable = masterSchema.table('work_location', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar(),
  description: text(),
  lat: doublePrecision(),
  lng: doublePrecision(),
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
