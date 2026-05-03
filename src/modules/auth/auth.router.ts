import { Route } from '@/constants/routes';
import { sessionMiddleware, signUpSchema } from '@/lib/auth';
import { validateForm } from '@/lib/validation';
import { Router } from 'express';
import { AuthController } from './auth.controller';
import { signInSchema } from './dto/sign-in.dto';

const authRouter = Router();

authRouter.post(
  Route.auth.sign_up,
  validateForm(signUpSchema),
  AuthController.signUp
);
authRouter.post(
  Route.auth.sign_in,
  validateForm(signInSchema),
  AuthController.signIn
);
authRouter.post(Route.auth.sign_out, sessionMiddleware, AuthController.signOut);
authRouter.post(
  Route.auth.sign_out_all,
  sessionMiddleware,
  AuthController.signOutAll
);

export { authRouter };
