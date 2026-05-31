import { Request } from 'express';
import { CompanyFilter, companyQueryFilter } from './company';
import { paginationParam, PaginationParam } from './pagination';
import { SearchParam, searchParam } from './search';
import { UserFilter, userQueryFilter } from './user';
export * from './company';
export * from './pagination';
export * from './search';
export * from './user';

export type QueryParam = {
  company: CompanyFilter;
  user: UserFilter;
  pagination: PaginationParam | null;
  search?: string;
};

export const buildQueryFilter = async (req: Request) => {
  const companyFilterData = await companyQueryFilter(req);
  const userFilterData = await userQueryFilter(req);
  const paginationParamData = paginationParam(req);
  const searchParamData = searchParam(req);

  const filter: QueryParam = {
    company: companyFilterData,
    user: userFilterData,
    pagination: paginationParamData,
    search: searchParamData,
  };

  return filter;
};
