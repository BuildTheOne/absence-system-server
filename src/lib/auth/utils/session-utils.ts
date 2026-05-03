import { Message } from '@/constants/messages';
import {
  JwtInvalidError,
  JwtPayload,
  UserAccountRepository,
  UserSessionRepository,
  verifyJwt,
} from '@/lib/auth';
import { UnauthorizedError } from '@/lib/error';
import { Request } from 'express';

export async function verifySession(req: Request) {
  const authorizationToken = req.headers['authorization'];

  if (!authorizationToken) {
    throw new JwtInvalidError();
  }

  const [bearer, token] = authorizationToken.split(' ');
  if (bearer !== 'Bearer') {
    throw new JwtInvalidError();
  }

  const tokenPayload = await verifyJwt<JwtPayload>(token);

  const userList = await UserAccountRepository.findByCredential(
    tokenPayload.email
  );
  if (userList.length === 0) {
    throw new UnauthorizedError(Message.USER_NOT_FOUND);
  }

  const sessionId = tokenPayload.sessionId;
  const sessionList = await UserSessionRepository.findById(sessionId);
  if (sessionList.length === 0) {
    throw new UnauthorizedError(Message.SESSION_NOT_FOUND);
  }

  return {
    session: sessionList[0],
    user: userList[0],
  };
}

export async function getUser(req: Request) {
  const { user } = await verifySession(req);
  return user;
}

export async function getSession(req: Request) {
  const { session } = await verifySession(req);
  return session;
}
