import type { TypedServer } from './socket-types.js';
import { authenticateSocket } from './socket-auth.js';
import { registerRoomEvents } from './room.socket.js';

export function initializeSocket(io: TypedServer): void {
  io.use(authenticateSocket);
  io.on('connection', (socket) => registerRoomEvents(io, socket));
}
