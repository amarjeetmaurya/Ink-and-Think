import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../../common/errors/app-error.js';
import { prisma } from '../../prisma/client.js';
import type { PublicUser } from './auth.types.js';

function toPublicUser(user: { id: string; email: string; username: string }): PublicUser {
  return { id: user.id, email: user.email, username: user.username };
}

function createToken(user: PublicUser): string {
  return jwt.sign({ email: user.email, username: user.username }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: '1d',
  });
}

export async function register(input: { email: string; username: string; password: string }) {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email: input.email }, { username: input.username }] },
  });
  if (existingUser) throw new AppError('Email or username is already in use', 409);

  const user = await prisma.user.create({
    data: { email: input.email, username: input.username, passwordHash: await bcrypt.hash(input.password, 12) },
  });
  const publicUser = toPublicUser(user);
  return { user: publicUser, token: createToken(publicUser) };
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new AppError('Invalid email or password', 401);
  }
  const publicUser = toPublicUser(user);
  return { user: publicUser, token: createToken(publicUser) };
}

export async function findUser(userId: string): Promise<PublicUser> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError('User not found', 404);
  return toPublicUser(user);
}
