import { verifyPermission } from '@/lib/rbac';
import { NextFunction, Request, Response } from 'express';

export function permissionMiddleware(permission: string) {
  return async (req: Request, _: Response, next: NextFunction) => {
    await verifyPermission(req, permission);
    next();
  };
}
