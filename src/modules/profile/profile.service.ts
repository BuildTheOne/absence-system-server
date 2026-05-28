import { Message } from '@/constants/messages';
import { NotFoundError } from '@/lib/error';
import { UserProfileRepository } from './user-profile.repository';

async function findProfileByUserIdService(userId: string) {
  const userData = await UserProfileRepository.findByUserId(userId);
  if (!userData) {
    throw new NotFoundError(Message.PROFILE_NOT_FOUND);
  }
  return userData;
}

export const ProfileService = {
  findByUserId: findProfileByUserIdService,
};
