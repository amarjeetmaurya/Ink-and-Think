import type { Server, Socket } from 'socket.io';
import type { RoomView } from '../modules/rooms/room.types.js';

export type SocketResult = { ok: true } | { ok: false; message: string };
export type SocketAcknowledgement = (result: SocketResult) => void;

export interface ServerToClientEvents {
  'room:created': (payload: { room: RoomView }) => void;
  'room:joined': (payload: { room: RoomView }) => void;
  'room:updated': (payload: { room: RoomView }) => void;
  'player:joined': (payload: { player: RoomView['players'][number] }) => void;
  'player:left': (payload: { userId: string }) => void;
  'game:started': (payload: { room: RoomView }) => void;
  'game:round-started': (payload: { room: RoomView }) => void;
  'game:word': (payload: { word: string }) => void;
  'game:round-ended': (payload: { word: string }) => void;
  'game:ended': (payload: { scores: RoomView['players'] }) => void;
  'chat:message': (payload: {
    id: string;
    userId: string;
    username: string;
    text: string;
    sentAt: string;
    correct: boolean;
  }) => void;
}

export interface ClientToServerEvents {
  'room:create': (payload: { maxPlayers?: number }, acknowledgement: SocketAcknowledgement) => void;
  'room:join': (payload: { code: string }, acknowledgement: SocketAcknowledgement) => void;
  'room:leave': (acknowledgement: SocketAcknowledgement) => void;
  'game:start': (acknowledgement: SocketAcknowledgement) => void;
  'chat:send': (payload: { text: string }, acknowledgement: SocketAcknowledgement) => void;
}

export type InterServerEvents = Record<string, never>;

export interface SocketData {
  userId: string;
  username: string;
  roomCode?: string;
}

export type TypedServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
