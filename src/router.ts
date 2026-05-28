import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { Module } from '@/constants/modules';
import { Route } from '@/constants/routes';
import { sessionMiddleware } from '@/lib/auth';
import { catchAsyncController } from '@/lib/error';
import { BaseResponse } from '@/lib/response';
import { authRouter } from '@/modules/auth/auth.router';
import { profileRouter } from '@/modules/profile/profile.router';
import { roleRouter } from '@/modules/role/role.router';
import { Request, Response, Router } from 'express';

const apiInfoController = catchAsyncController(
  async (_: Request, res: Response) => {
    res.json(
      BaseResponse(HttpStatus.OK, Message.SUCCESS, {
        title: Module.main.name,
        version: 1,
        description: Module.main.desc,
        author: 'https://github.com/BuildTheOne',
      })
    );
  }
);

const appRouter = Router();

appRouter.get(Route.main, apiInfoController);
// appRouter.use(Route.auth, rateLimiter(60, 5), authRouter);
appRouter.use(Route.auth, authRouter);
appRouter.use(Route.rbac.role, sessionMiddleware, roleRouter);
appRouter.use(Route.profile, sessionMiddleware, profileRouter);

export { appRouter };
