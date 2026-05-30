import { companyTable, userAccountTable } from '@/db/schema/core.schema';
import {
  doublePrecision,
  pgSchema,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { employeeTable, workLocationTable } from './master.schema';

export const hrSchema = pgSchema('hr');

export const absenceTypeEnum = hrSchema.enum('absence_type', ['IN', 'OUT']);

export const employeeAbsenceTable = hrSchema.table('employee_absence', {
  id: uuid().defaultRandom().primaryKey(),
  employeeId: uuid()
    .notNull()
    .references(() => employeeTable.id),
  absenceType: absenceTypeEnum(),
  date: timestamp(),
  lat: doublePrecision(),
  lng: doublePrecision(),
  distance: doublePrecision(),
  workLocationId: uuid().references(() => workLocationTable.id),
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

export const employeeActivityTable = hrSchema.table('employee_activity', {
  id: uuid().defaultRandom().primaryKey(),
  employeeId: uuid()
    .notNull()
    .references(() => employeeTable.id),
  date: timestamp().defaultNow().notNull(),
  description: text(),
  mediaUrl: text(),
  workLocationId: uuid()
    .notNull()
    .references(() => workLocationTable.id),
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
