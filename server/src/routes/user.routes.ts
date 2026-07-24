import { Router } from 'express';
import { getUser } from '../controllers/user.controller.js';
import { requireAuth } from '../common/middleware/auth.middleware.js';

export const userRouter = Router();

userRouter.get('/me', requireAuth, getUser);
