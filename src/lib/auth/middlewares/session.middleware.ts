import { verifySession } from '@/lib/auth';
import { NextFunction, Request, Response } from 'express';

export async function sessionMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  await verifySession(req);
  next();
}
