import { Env } from '@/env';
import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';
import { JwtError, JwtExpiredError, JwtInvalidError } from '../types/jwt-error';

const jwtSecret = Env.JWT.SECRET!;

export async function signJwt(payload: any, expiresIn: number) {
  return sign(payload, jwtSecret, {
    expiresIn: expiresIn,
    algorithm: 'HS256',
  });
}

export async function verifyJwt<T>(token: string) {
  try {
    return verify(token, jwtSecret) as T;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new JwtExpiredError();
    }
    if (error instanceof JsonWebTokenError) {
      throw new JwtInvalidError();
    }
    throw new JwtError();
  }
}
