import { getUser } from '@/lib/auth';
import { eq, isNull } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { Request } from 'express';

export type CompanyFilter = {
  companyId: string;
};

export const companyQueryFilter = async (req: Request) => {
  const { companyId } = await getUser(req);
  const companyFilter: CompanyFilter = {
    companyId: companyId,
  };
  return companyFilter;
};

export const buildCompanyFilter = <T extends TableConfig>(
  table: PgTableWithColumns<T>,
  companyFilter: CompanyFilter
) => {
  return [
    eq(table.companyId, companyFilter.companyId),
    isNull(table.deletedAt),
  ];
};

export const buildCompanyData = (companyFilter: CompanyFilter) => {
  return {
    companyId: companyFilter.companyId,
  };
};
