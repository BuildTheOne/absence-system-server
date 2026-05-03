import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { Module } from '@/constants/modules';
import { Route } from '@/constants/routes';
import { sessionMiddleware } from '@/lib/auth';
import { catchAsync } from '@/lib/error';
import { rateLimiter } from '@/lib/rate-limiter';
import { BaseResponse } from '@/lib/response';
import { authRouter } from '@/modules/auth/auth.router';
import { roleRouter } from '@/modules/role/role.router';
import { Request, Response, Router } from 'express';

const apiInfoController = catchAsync(async (_: Request, res: Response) => {
  res.json(
    BaseResponse(HttpStatus.OK, Message.SUCCESS, {
      title: Module.main.name,
      version: 1,
      description: Module.main.desc,
      author: 'https://github.com/BuildTheOne',
    })
  );
});

const appRouter = Router();

appRouter.get(Route.main, apiInfoController);
appRouter.use(Route.auth, rateLimiter(60, 5), authRouter);
appRouter.use(Route.rbac.role, sessionMiddleware, roleRouter);

export { appRouter };
