import { Message } from '@/constants/messages';
import {
  JwtPayload,
  UserAccountRepository,
  UserSessionRepository,
  verifyJwt,
} from '@/lib/auth';
import { UnauthorizedError } from '@/lib/error';
import { Request } from 'express';

export async function verifySession(req: Request) {
  const token = getToken(req);
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

function getToken(req: Request) {
  const authorizationToken = req.headers['authorization'] ?? '';

  if (authorizationToken.startsWith('Bearer ')) {
    return authorizationToken.split(' ')[1];
  }

  const cookiesRaw = req.headers['cookie'] ?? '';
  const cookies = cookiesRaw.split(';').reduce(
    (cookies, cookie) => {
      const [rawKey, rawValue] = cookie.split('=');
      if (!rawKey || !rawValue) return cookies;

      const key = rawKey.trim();
      const value = decodeURIComponent(rawValue.trim());

      cookies[key] = value;
      return cookies;
    },
    {} as Record<string, string>
  );

  if (cookies.accessToken) {
    return cookies.accessToken;
  }

  throw new UnauthorizedError();
}

export async function getUser(req: Request) {
  const { user } = await verifySession(req);
  return user;
}

export async function getSession(req: Request) {
  const { session } = await verifySession(req);
  return session;
}
