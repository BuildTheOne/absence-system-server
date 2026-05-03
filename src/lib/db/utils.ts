import { and, isNull, or, SQL } from 'drizzle-orm';
import { PgSelect, PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { ZodType } from 'zod';

type WhereClauseProps<T extends TableConfig> = {
  table: PgTableWithColumns<T>;
  andClause?: SQL[];
  orClause?: SQL[];
  showDeleted?: boolean;
};

export const buildWhereClause = <T extends TableConfig>(
  whereClauseProps: WhereClauseProps<T>
) => {
  const { table, andClause, orClause, showDeleted = false } = whereClauseProps;

  const whereAnd: SQL[] = [];
  const whereOr: SQL[] = [];

  if (!showDeleted) {
    whereAnd.push(isNull(table.deletedAt));
  }

  if (andClause) {
    whereAnd.push(...andClause);
  }

  if (orClause) {
    whereOr.push(...orClause);
  }

  return and(...whereAnd, or(...whereOr));
};

export type PaginationQueryParam = {
  page?: number;
  pageSize?: number;
};

type PaginationClauseProps<T extends PgSelect> = {
  query: T;
} & PaginationQueryParam;

export function buildPaginationClause<T extends PgSelect>(
  paginationClauseProps: PaginationClauseProps<T>
) {
  const { query, page, pageSize } = paginationClauseProps;

  let formattedQuery = query;
  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * Number(pageSize);

  if (limit > 0) {
    formattedQuery = formattedQuery.limit(limit);
  }
  if (offset > 0) {
    formattedQuery = formattedQuery.offset(offset);
  }

  return formattedQuery;
}

export const filterQueryResult = <T extends ZodType>(
  schema: T,
  rawData: any | any[]
) => {
  if (Array.isArray(rawData)) {
    return rawData.map((data) => schema.parse(data));
  }
  return schema.parse(rawData);
};
