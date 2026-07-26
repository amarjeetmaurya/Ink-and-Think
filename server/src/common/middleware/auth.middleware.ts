import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../errors/app-error.js';
import type { AuthToken } from '../../modules/auth/auth.types.js';

export const requireAuth: RequestHandler = (request, _response, next) => {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return next(new AppError('Authentication required', 401));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthToken;
    request.user = { id: payload.sub, email: payload.email, username: payload.username };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
