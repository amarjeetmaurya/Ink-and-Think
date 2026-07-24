import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { app } from './app/app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { connectRedis, redis } from './config/redis.js';
import { prisma } from './prisma/client.js';
import { initializeSocket } from './socket/index.js';
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './socket/socket-types.js';

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
  cors: { origin: env.CLIENT_URL, credentials: true },
});

initializeSocket(io);

async function bootstrap(): Promise<void> {
  await prisma.$connect();
  await connectRedis();
  httpServer.listen(env.PORT, () => logger.info({ port: env.PORT }, 'Server listening'));
}

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, 'Shutting down');
  io.close();
  await prisma.$disconnect();
  if (redis.isOpen) await redis.quit();
  httpServer.close();
}

process.once('SIGINT', () => void shutdown('SIGINT'));
process.once('SIGTERM', () => void shutdown('SIGTERM'));

void bootstrap();
