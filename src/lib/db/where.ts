import { and, ilike, isNull, or, SQL } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export type WhereClauseProps<TTable extends PgTableWithColumns<any>> = {
  table: TTable;
  andClause?: SQL[];
  orClause?: SQL[];
  showDeleted?: boolean;
  search?: string;
  searchField?: (keyof TTable['_']['columns'])[];
};

export const buildWhereClause = <TTable extends PgTableWithColumns<any>>(
  whereClauseProps: WhereClauseProps<TTable>
) => {
  const {
    table,
    andClause,
    orClause,
    showDeleted = false,
    search,
    searchField,
  } = whereClauseProps;

  const whereAnd: SQL[] = [];
  const whereOr: SQL[] = [];
  const whereSearch: SQL[] = [];

  if (!showDeleted) {
    whereAnd.push(isNull(table.deletedAt));
  }

  if (andClause) {
    whereAnd.push(...andClause);
  }

  if (orClause) {
    whereOr.push(...orClause);
  }

  if (search && searchField) {
    whereSearch.push(
      ...searchField.map((field) => ilike(table[field], `%${search}%`))
    );
  }

  return and(...whereAnd, or(...whereOr), ...whereSearch);
};
