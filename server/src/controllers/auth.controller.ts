import type { RequestHandler } from 'express';
import { loginSchema, registerSchema } from '../modules/auth/auth.schemas.js';
import { findUser, login, register } from '../modules/auth/auth.service.js';

export const registerUser: RequestHandler = async (request, response) => {
  const result = await register(registerSchema.parse(request.body));
  response.status(201).json(result);
};

export const loginUser: RequestHandler = async (request, response) => {
  response.status(200).json(await login(loginSchema.parse(request.body)));
};

export const getCurrentUser: RequestHandler = async (request, response) => {
  response.status(200).json({ user: await findUser(request.user!.id) });
};
