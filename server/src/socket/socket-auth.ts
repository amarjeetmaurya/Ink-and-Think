import jwt from 'jsonwebtoken';
import type { ExtendedError } from 'socket.io';
import { env } from '../config/env.js';
import type { AuthToken } from '../modules/auth/auth.types.js';
import type { TypedSocket } from './socket-types.js';

export function authenticateSocket(socket: TypedSocket, next: (error?: ExtendedError) => void): void {
  const token = socket.handshake.auth.token;
  if (typeof token !== 'string') return next(new Error('Authentication required'));
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthToken;
    socket.data.userId = payload.sub;
    socket.data.username = payload.username;
    next();
  } catch {
    next(new Error('Invalid or expired token'));
  }
}
