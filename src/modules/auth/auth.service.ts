import { Message } from '@/constants/messages';
import { Env } from '@/env';
import {
  CompanyRepository,
  compareHash,
  generateHash,
  JwtPayload,
  signJwt,
  SignUpDto,
  UserAccountRepository,
  UserSessionRepository,
} from '@/lib/auth';
import { BadRequestError, ConflictError, NotFoundError } from '@/lib/error';
import { randomUUID } from 'crypto';
import { add } from 'date-fns';

async function signUpService(inputData: SignUpDto) {
  const { username, email, password, companyCode } = inputData;
  const existingUsername =
    await UserAccountRepository.findByCredential(username);
  const existingEmail = await UserAccountRepository.findByCredential(email);

  if (existingUsername.length > 0 || existingEmail.length > 0) {
    throw new ConflictError(Message.USERNAME_EMAIL_EXISTED);
  }

  const existingCompany = await CompanyRepository.findByCode(companyCode);
  if (existingCompany.length === 0) {
    throw new NotFoundError(Message.COMPANY_NOT_FOUND);
  }

  const passwordHashed = await generateHash(password);

  const data = await UserAccountRepository.create({
    ...inputData,
    password: passwordHashed,
    companyCode: existingCompany[0].id,
  });

  return data;
}

async function signInService(credential: string, password: string) {
  const userList = await UserAccountRepository.findByCredential(credential);

  if (userList.length === 0) {
    throw new BadRequestError(Message.SIGN_IN_FAILED);
  }

  const user = userList[0];
  const isPasswordMatch = await compareHash(password, user.password);
  if (!isPasswordMatch) {
    throw new BadRequestError(Message.SIGN_IN_FAILED);
  }

  const sessionId = randomUUID();

  const jwtPayload: JwtPayload = {
    email: user.email,
    sessionId: sessionId,
  };

  const accessToken = await signJwt(jwtPayload, Env.JWT.ACCESS_EXPIRES);
  const refreshToken = await signJwt(jwtPayload, Env.JWT.REFRESH_EXPIRES);

  const payload = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  await UserSessionRepository.create({
    id: sessionId,
    userId: user.id,
    refreshToken,
    expiredAt: add(new Date(), {
      seconds: Env.JWT.ACCESS_EXPIRES,
    }),
    companyId: user.companyId,
  });
  await UserAccountRepository.updateLastLogin(user.id);

  return payload;
}

async function signOutService(sessionId: string) {
  const data = await UserSessionRepository.deleteById(sessionId);
  return data;
}

async function signOutAllService(userId: string) {
  const data = await UserSessionRepository.deleteByUserId(userId);
  return data;
}

export const AuthService = {
  signIn: signInService,
  signOut: signOutService,
  signOutAll: signOutAllService,
  signUp: signUpService,
};
