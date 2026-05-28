import { Router } from 'express';
import { ProfileController } from './profile.controller';

const profileRouter = Router();

profileRouter.get('/', ProfileController.findByUserId);

export { profileRouter };
