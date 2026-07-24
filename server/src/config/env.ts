import 'dotenv/config';
import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(32),
  GAME_ROUNDS: z.coerce.number().int().min(1).max(10).default(3),
  GUESSING_MS: z.coerce.number().int().min(10_000).max(180_000).default(60_000),
  REVEAL_MS: z.coerce.number().int().min(1_000).max(30_000).default(4_000),
});

export const env = environmentSchema.parse(process.env);
