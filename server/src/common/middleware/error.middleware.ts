import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error.js';
import { logger } from '../../config/logger.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next;
  if (error instanceof ZodError) {
    response.status(400).json({ message: 'Invalid request data', issues: error.flatten() });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  logger.error({ error }, 'Unhandled request error');
  response.status(500).json({ message: 'Internal server error' });
};
