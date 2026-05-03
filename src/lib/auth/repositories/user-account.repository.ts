import { userAccountTable } from '@/db/schema';
import { SignUpDto } from '@/lib/auth/dto/sign-up.dto';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsync } from '@/lib/error';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

const findUserAccountByIdRepository = catchAsync(async (userId: string) => {
  const whereClause = buildWhereClause({
    table: userAccountTable,
    andClause: [
      eq(userAccountTable.isActive, true),
      eq(userAccountTable.id, userId),
    ],
  });

  const data = await db.select().from(userAccountTable).where(whereClause);
  return data;
});

const findUserAccountByCredentialRepository = catchAsync(
  async (payload: string) => {
    const whereClause = buildWhereClause({
      table: userAccountTable,
      andClause: [eq(userAccountTable.isActive, true)],
      orClause: [
        eq(userAccountTable.username, payload),
        eq(userAccountTable.email, payload),
      ],
    });

    const data = await db.select().from(userAccountTable).where(whereClause);
    return data;
  }
);

const createUserAccountRepository = catchAsync(async (inputData: SignUpDto) => {
  const data = await db
    .insert(userAccountTable)
    .values({
      ...inputData,
      id: randomUUID(),
      isActive: true,
      companyId: inputData.companyCode,
    })
    .returning();
  return data;
});

const updateUserAccountLastLoginByIdRepository = catchAsync(
  async (userId: string) => {
    const data = await db
      .update(userAccountTable)
      .set({
        lastLogin: new Date(),
      })
      .where(eq(userAccountTable.id, userId))
      .returning();
    return data;
  }
);

const updateUserAccountPasswordByIdRepository = catchAsync(
  async (userId: string, password: string) => {
    const whereClause = buildWhereClause({
      table: userAccountTable,
      andClause: [
        eq(userAccountTable.isActive, true),
        eq(userAccountTable.id, userId),
      ],
    });

    const data = await db
      .update(userAccountTable)
      .set({
        password: password,
      })
      .where(whereClause)
      .returning();
    return data;
  }
);

export const UserAccountRepository = {
  findById: findUserAccountByIdRepository,
  findByCredential: findUserAccountByCredentialRepository,
  create: createUserAccountRepository,
  updateLastLogin: updateUserAccountLastLoginByIdRepository,
  setPassword: updateUserAccountPasswordByIdRepository,
};
