import cors from 'cors';
import express from 'express';
import { errorHandler } from '../common/middleware/error.middleware.js';
import { env } from '../config/env.js';
import { authRouter } from '../routes/auth.routes.js';
import { healthRouter } from '../routes/health.routes.js';
import { userRouter } from '../routes/user.routes.js';

export const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use(errorHandler);
