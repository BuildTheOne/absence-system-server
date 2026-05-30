import { getUser } from '@/lib/auth';
import { and, eq, isNull, or, SQL } from 'drizzle-orm';
import { PgSelect, PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { Request } from 'express';
import { ZodType } from 'zod';
import {
  CompanyQueryFilter,
  PaginationQueryParam,
  QueryParamFilter,
  UserQueryFilter,
  WhereClauseProps,
} from './types';

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

export const companyQueryFilter = async (req: Request) => {
  const { companyId } = await getUser(req);
  const companyFilter: CompanyQueryFilter = {
    companyId: companyId,
  };
  return companyFilter;
};

export const buildCompanyFilter = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  companyFilter: CompanyQueryFilter
) => {
  return [
    eq(table.companyId, companyFilter.companyId),
    isNull(table.deletedAt),
  ];
};

export const userQueryFilter = async (req: Request) => {
  const { id: userId } = await getUser(req);
  const userFilter: UserQueryFilter = {
    userId: userId,
  };
  return userFilter;
};

export const buildQueryFilter = async (req: Request) => {
  const companyFilter = await companyQueryFilter(req);
  const userFilter = await userQueryFilter(req);

  const filter: QueryParamFilter = {
    company: companyFilter,
    user: userFilter,
  };

  return filter;
};
