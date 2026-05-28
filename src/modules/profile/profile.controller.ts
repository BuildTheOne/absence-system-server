import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { getUser } from '@/lib/auth';
import { catchAsyncController } from '@/lib/error';
import { BaseResponse } from '@/lib/response';
import { ProfileService } from './profile.service';

const finProfileByUserIdController = catchAsyncController(async (req, res) => {
  const user = await getUser(req);
  const userData = await ProfileService.findByUserId(user.id);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, userData));
});

export const ProfileController = {
  findByUserId: finProfileByUserIdController,
};
