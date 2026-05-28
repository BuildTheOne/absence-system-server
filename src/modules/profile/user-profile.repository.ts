import { companyTable, userAccountTable, userProfileTable } from '@/db/schema';
import { buildWhereClause, db } from '@/lib/db';
import { catchAsyncRepository } from '@/lib/error';
import { eq } from 'drizzle-orm';
import { UserProfileDto } from './profile.dto';

const findUserProfileByUserIdRepository = catchAsyncRepository(
  async (userId: string) => {
    const whereClause = buildWhereClause({
      table: userProfileTable,
      andClause: [
        eq(userAccountTable.isActive, true),
        eq(userProfileTable.userId, userId),
      ],
    });

    const dataQuery = await db
      .select()
      .from(userProfileTable)
      .innerJoin(
        userAccountTable,
        eq(userAccountTable.id, userProfileTable.userId)
      )
      .innerJoin(companyTable, eq(companyTable.id, userAccountTable.companyId))
      .where(whereClause);

    const [data] = dataQuery;
    if (!data) {
      return null;
    }

    const result: UserProfileDto = {
      username: data.user_account.username,
      email: data.user_account.email,
      companyId: data.user_account.companyId,
      companyName: data.company.name,
      displayName: data.user_profile.displayName,
      profilePhoto: data.user_profile.profilePhoto,
    };

    return result;
  }
);

export const UserProfileRepository = {
  findByUserId: findUserProfileByUserIdRepository,
};
