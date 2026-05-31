import { getUser } from '@/lib/auth';
import { sql } from 'drizzle-orm';
import { Request } from 'express';

export type UserFilter = {
  userId: string;
};

type UserQueryType = 'CREATE' | 'UPDATE' | 'DELETE';

export const userQueryFilter = async (req: Request) => {
  const { id: userId } = await getUser(req);
  const userFilter: UserFilter = {
    userId: userId,
  };
  return userFilter;
};

export const buildUserData = (userFilter: UserFilter, type: UserQueryType) => {
  if (type === 'CREATE') {
    return {
      createdAt: sql`CURRENT_TIMESTAMP`,
      createdBy: userFilter.userId,
    };
  }
  if (type === 'UPDATE') {
    return {
      updatedAt: sql`CURRENT_TIMESTAMP`,
      updatedBy: userFilter.userId,
    };
  }
  if (type === 'DELETE') {
    return {
      deletedAt: sql`CURRENT_TIMESTAMP`,
      deletedBy: userFilter.userId,
    };
  }
  return null;
};
