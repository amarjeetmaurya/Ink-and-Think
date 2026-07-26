import { randomBytes } from 'node:crypto';
import { AppError } from '../../common/errors/app-error.js';
import { prisma } from '../../prisma/client.js';
import type { Player, RoomState, RoomView } from './room.types.js';

const rooms = new Map<string, RoomState>();

function generateCode(): string {
  return randomBytes(5).toString('base64url').slice(0, 6).toUpperCase();
}

function publicPlayer(player: Player): Omit<Player, 'socketId'> {
  return { userId: player.userId, username: player.username, score: player.score };
}

export function toRoomView(room: RoomState): RoomView {
  return {
    code: room.code,
    hostUserId: room.hostUserId,
    maxPlayers: room.maxPlayers,
    players: [...room.players.values()].map(publicPlayer),
    game: room.game
      ? {
          status: room.game.status,
          round: room.game.round,
          totalRounds: room.game.totalRounds,
          drawerUserId: room.game.drawerUserId,
          endsAt: room.game.endsAt,
        }
      : null,
  };
}

export function getRoom(code: string): RoomState {
  const room = rooms.get(code);
  if (!room) throw new AppError('Room not found', 404);
  return room;
}

export async function createRoom(player: Omit<Player, 'score'>, maxPlayers: number): Promise<RoomState> {
  let code = generateCode();
  while (rooms.has(code)) code = generateCode();

  const record = await prisma.room.create({ data: { code, maxPlayers, hostId: player.userId } });
  const room: RoomState = {
    id: record.id,
    code,
    maxPlayers,
    hostUserId: player.userId,
    players: new Map([[player.userId, { ...player, score: 0 }]]),
  };
  rooms.set(code, room);
  return room;
}

export function joinRoom(code: string, player: Omit<Player, 'score'>): RoomState {
  const room = getRoom(code);
  const existing = room.players.get(player.userId);
  if (existing) {
    existing.socketId = player.socketId;
    return room;
  }
  if (room.game) throw new AppError('A game is already in progress', 409);
  if (room.players.size >= room.maxPlayers) throw new AppError('Room is full', 409);
  room.players.set(player.userId, { ...player, score: 0 });
  return room;
}

export async function leaveRoom(code: string, userId: string): Promise<{ room?: RoomState; player?: Player }> {
  const room = rooms.get(code);
  if (!room) return {};
  const player = room.players.get(userId);
  if (!player) return { room };

  room.players.delete(userId);
  if (room.hostUserId === userId) room.hostUserId = room.players.keys().next().value ?? '';
  if (room.players.size === 0) {
    rooms.delete(code);
    await prisma.room.delete({ where: { id: room.id } });
    return { player };
  }
  return { room, player };
}
