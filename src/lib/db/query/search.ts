import { Request } from 'express';

export type SearchParam = {
  search?: string;
};

export const searchParam = (req: Request) => {
  const searchQueryParam = req.query['search'];
  return searchQueryParam as string | undefined;
};
