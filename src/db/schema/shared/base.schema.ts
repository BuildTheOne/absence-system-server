import { userAccountTable } from '@/db/schema';
import { companyTable } from '@/db/schema/core.schema';
import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const timestampFields = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
};

export const actionByFields = {
  createdBy: uuid().references(() => userAccountTable.id),
  updatedBy: uuid().references(() => userAccountTable.id),
  deletedBy: uuid().references(() => userAccountTable.id),
};

export const companyFields = {
  companyId: uuid()
    .notNull()
    .references(() => companyTable.id),
};

export const baseFields = {
  ...companyFields,
  ...actionByFields,
  ...timestampFields,
};
