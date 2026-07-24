import pino from 'pino';
import { env } from './env.js';

export const logger =
  env.NODE_ENV === 'production'
    ? pino({ level: 'info' })
    : pino({ level: 'debug', transport: { target: 'pino-pretty' } });
