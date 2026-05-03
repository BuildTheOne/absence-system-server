import { userSessionTable } from '@/db/schema';
import { CreateUserSessionDto } from '@/lib/auth';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsync } from '@/lib/error';
import { eq } from 'drizzle-orm';

const findUserSessionByIdRepository = catchAsync(async (sessionId: string) => {
  const whereClause = buildWhereClause({
    table: userSessionTable,
    andClause: [eq(userSessionTable.id, sessionId)],
  });

  const data = await db.select().from(userSessionTable).where(whereClause);
  return data;
});

const findUserSessionByRefreshTokenRepository = catchAsync(
  async (refreshToken: string) => {
    const whereClause = buildWhereClause({
      table: userSessionTable,
      andClause: [eq(userSessionTable.refreshToken, refreshToken)],
    });

    const data = await db.select().from(userSessionTable).where(whereClause);
    return data;
  }
);

const createUserSessionRepository = catchAsync(
  async (inputData: CreateUserSessionDto) => {
    const data = await db.insert(userSessionTable).values(inputData);
    return data;
  }
);

const deleteUserSessionByIdRepository = catchAsync(
  async (sessionId: string) => {
    const data = await db
      .delete(userSessionTable)
      .where(eq(userSessionTable.id, sessionId))
      .returning();
    return data;
  }
);

const deleteUserSessionByUserIdRepository = catchAsync(
  async (userId: string) => {
    const data = await db
      .delete(userSessionTable)
      .where(eq(userSessionTable.userId, userId))
      .returning();
    return data;
  }
);

export const UserSessionRepository = {
  create: createUserSessionRepository,
  findById: findUserSessionByIdRepository,
  findByRefreshToken: findUserSessionByRefreshTokenRepository,
  deleteById: deleteUserSessionByIdRepository,
  deleteByUserId: deleteUserSessionByUserIdRepository,
};
