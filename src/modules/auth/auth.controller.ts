import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { getSession } from '@/lib/auth';
import { SignUpDto } from '@/lib/auth/dto/sign-up.dto';
import { catchAsyncController } from '@/lib/error';
import { BaseResponse } from '@/lib/response';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

const signUpController = catchAsyncController(async (req, res) => {
  const data = req.body as SignUpDto;
  await AuthService.signUp(data);
  res.json(BaseResponse(HttpStatus.OK, Message.SIGN_UP_SUCCESS));
});

const signInController = catchAsyncController(async (req, res) => {
  const { username, password } = req.body as SignInDto;
  const signInData = await AuthService.signIn(username, password);
  res.json(BaseResponse(HttpStatus.OK, Message.SIGN_IN_SUCCESS, signInData));
});

const signOutController = catchAsyncController(async (req, res) => {
  const session = await getSession(req);
  await AuthService.signOut(session.id);
  res.json(BaseResponse(HttpStatus.OK, Message.SIGN_OUT_SUCCESS));
});

const signOutAllController = catchAsyncController(async (req, res) => {
  const session = await getSession(req);
  await AuthService.signOutAll(session.userId);
  res.json(BaseResponse(HttpStatus.OK, Message.SIGN_OUT_SUCCESS));
});

export const AuthController = {
  signUp: signUpController,
  signIn: signInController,
  signOut: signOutController,
  signOutAll: signOutAllController,
};
