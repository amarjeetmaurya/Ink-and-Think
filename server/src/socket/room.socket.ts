import { z } from 'zod';
import { AppError } from '../common/errors/app-error.js';
import { env } from '../config/env.js';
import {
  clearGameTimer,
  createMessageId,
  finishRound,
  markCorrectGuess,
  setRoundTimer,
  startGame,
} from '../modules/game/game.service.js';
import { createRoomSchema, joinRoomSchema } from '../modules/rooms/room.schemas.js';
import { createRoom, getRoom, joinRoom, leaveRoom, toRoomView } from '../modules/rooms/room.service.js';
import type { RoomState } from '../modules/rooms/room.types.js';
import type { SocketAcknowledgement, TypedServer, TypedSocket } from './socket-types.js';

const chatSchema = z.object({ text: z.string().trim().min(1).max(200) });

function failure(acknowledgement: SocketAcknowledgement, error: unknown): void {
  acknowledgement({ ok: false, message: error instanceof Error ? error.message : 'Request failed' });
}

function emitRoomUpdate(io: TypedServer, room: RoomState): void {
  io.to(room.code).emit('room:updated', { room: toRoomView(room) });
}

function emitRoundStart(io: TypedServer, room: RoomState, initial = false): void {
  const game = room.game;
  if (!game) return;
  if (initial) io.to(room.code).emit('game:started', { room: toRoomView(room) });
  else io.to(room.code).emit('game:round-started', { room: toRoomView(room) });
  const drawer = room.players.get(game.drawerUserId);
  if (drawer) io.to(drawer.socketId).emit('game:word', { word: game.word });
}

function scheduleRound(io: TypedServer, room: RoomState): void {
  setRoundTimer(room, (activeRoom, word) => {
    if (!activeRoom.game) return;
    activeRoom.game.status = 'revealing';
    io.to(activeRoom.code).emit('game:round-ended', { word });
    emitRoomUpdate(io, activeRoom);
    setTimeout(() => {
      void finishRound(activeRoom)
        .then((outcome) => {
          if (outcome === 'game-ended') {
            io.to(activeRoom.code).emit('game:ended', { scores: toRoomView(activeRoom).players });
            emitRoomUpdate(io, activeRoom);
            return;
          }
          emitRoundStart(io, activeRoom);
          emitRoomUpdate(io, activeRoom);
          scheduleRound(io, activeRoom);
        })
        .catch(() => undefined);
    }, env.REVEAL_MS);
  });
}

async function leaveCurrentRoom(io: TypedServer, socket: TypedSocket): Promise<void> {
  const code = socket.data.roomCode;
  if (!code) return;
  socket.leave(code);
  delete socket.data.roomCode;
  const { room, player } = await leaveRoom(code, socket.data.userId);
  if (!room) {
    clearGameTimer(code);
    return;
  }
  if (player) io.to(code).emit('player:left', { userId: player.userId });
  emitRoomUpdate(io, room);
}

export function registerRoomEvents(io: TypedServer, socket: TypedSocket): void {
  socket.on('room:create', async (payload, acknowledgement) => {
    try {
      await leaveCurrentRoom(io, socket);
      const { maxPlayers } = createRoomSchema.parse(payload);
      const room = await createRoom(
        { userId: socket.data.userId, username: socket.data.username, socketId: socket.id },
        maxPlayers,
      );
      socket.join(room.code);
      socket.data.roomCode = room.code;
      socket.emit('room:created', { room: toRoomView(room) });
      acknowledgement({ ok: true });
    } catch (error) {
      failure(acknowledgement, error);
    }
  });

  socket.on('room:join', async (payload, acknowledgement) => {
    try {
      const { code } = joinRoomSchema.parse(payload);
      if (socket.data.roomCode !== code) await leaveCurrentRoom(io, socket);
      const room = joinRoom(code, { userId: socket.data.userId, username: socket.data.username, socketId: socket.id });
      socket.join(code);
      socket.data.roomCode = code;
      socket.emit('room:joined', { room: toRoomView(room) });
      const player = room.players.get(socket.data.userId)!;
      socket.to(code).emit('player:joined', { player: { userId: player.userId, username: player.username, score: player.score } });
      emitRoomUpdate(io, room);
      acknowledgement({ ok: true });
    } catch (error) {
      failure(acknowledgement, error);
    }
  });

  socket.on('room:leave', async (acknowledgement) => {
    try {
      await leaveCurrentRoom(io, socket);
      acknowledgement({ ok: true });
    } catch (error) {
      failure(acknowledgement, error);
    }
  });

  socket.on('game:start', async (acknowledgement) => {
    try {
      const room = getRoom(socket.data.roomCode ?? '');
      if (room.hostUserId !== socket.data.userId) throw new AppError('Only the host can start the game', 403);
      await startGame(room);
      emitRoundStart(io, room, true);
      emitRoomUpdate(io, room);
      scheduleRound(io, room);
      acknowledgement({ ok: true });
    } catch (error) {
      failure(acknowledgement, error);
    }
  });

  socket.on('chat:send', (payload, acknowledgement) => {
    try {
      const { text } = chatSchema.parse(payload);
      const room = getRoom(socket.data.roomCode ?? '');
      const correct = markCorrectGuess(room, socket.data.userId, text);
      io.to(room.code).emit('chat:message', {
        id: createMessageId(),
        userId: socket.data.userId,
        username: socket.data.username,
        text: correct ? `${socket.data.username} guessed the word!` : text,
        sentAt: new Date().toISOString(),
        correct,
      });
      if (correct) emitRoomUpdate(io, room);
      acknowledgement({ ok: true });
    } catch (error) {
      failure(acknowledgement, error);
    }
  });

  socket.on('disconnect', () => {
    void leaveCurrentRoom(io, socket);
  });
}
