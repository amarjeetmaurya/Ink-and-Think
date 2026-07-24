import type { RequestHandler } from 'express';
import { findUser } from '../modules/auth/auth.service.js';

/** Returns the authenticated user's public profile. */
export const getUser: RequestHandler = async (request, response) => {
  response.status(200).json({ user: await findUser(request.user!.id) });
};
