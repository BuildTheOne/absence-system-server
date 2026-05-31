import { PgSelect } from 'drizzle-orm/pg-core';
import { Request } from 'express';

export type PaginationParam = {
  page?: number;
  pageSize?: number;
};

export type PaginationClauseProps<T extends PgSelect> = {
  query: T;
} & PaginationParam;

export const paginationParam = (req: Request) => {
  const page = req.query['page'];
  const pageSize = req.query['pageSize'];

  if (!page || !pageSize) return null;

  const paginationParam: PaginationParam = {
    page: Number(page ?? 1),
    pageSize: Number(pageSize ?? 10),
  };
  return paginationParam;
};

export function buildPaginationQuery<T extends PgSelect>(
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
