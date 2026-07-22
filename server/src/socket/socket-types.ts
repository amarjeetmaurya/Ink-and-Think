// socket-types.ts
import { Server, Socket } from "socket.io";

export interface ServerToClientEvents {
  "receive-message": (message: string) => void;
}

// socket-types.ts
export interface ClientToServerEvents {
  "send-message": (text: string) => void;
  "join-room": (roomId: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
  username: string;
  roomId?: string;
}

// Type aliases so you don't repeat the 4 generics everywhere
export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;