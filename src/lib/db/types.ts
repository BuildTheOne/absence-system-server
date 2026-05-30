import { SQL } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

export type WhereClauseProps<T extends TableConfig> = {
  table: PgTableWithColumns<T>;
  andClause?: SQL[];
  orClause?: SQL[];
  showDeleted?: boolean;
};

export type PaginationQueryParam = {
  page?: number;
  pageSize?: number;
};

export type CompanyQueryFilter = {
  companyId: string;
};

export type UserQueryFilter = {
  userId: string;
};

export type QueryParamFilter = {
  company: CompanyQueryFilter;
  user: UserQueryFilter;
  pagination?: PaginationQueryParam;
};
