import { createClient } from 'redis';
import { env } from './env.js';
import { logger } from './logger.js';

export const redis = createClient({ url: env.REDIS_URL });

redis.on('error', (error: Error) => logger.warn({ error }, 'Redis unavailable'));

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
    logger.info('Redis connected');
  } catch (error) {
    logger.warn({ error }, 'Continuing without Redis');
  }
}
