import { randomUUID } from 'node:crypto';
import { env } from '../../config/env.js';
import { AppError } from '../../common/errors/app-error.js';
import { prisma } from '../../prisma/client.js';
import type { GameState, RoomState } from '../rooms/room.types.js';
import { words } from './words.js';

const timers = new Map<string, NodeJS.Timeout>();

function randomItem<T>(items: T[]): T {
  const item = items[Math.floor(Math.random() * items.length)];
  if (item === undefined) throw new AppError('Unable to start game', 500);
  return item;
}

function selectDrawer(room: RoomState): string {
  const candidates = [...room.players.keys()].filter((userId) => userId !== room.game?.previousDrawerUserId);
  return randomItem(candidates.length ? candidates : [...room.players.keys()]);
}

function newRound(room: RoomState, game: GameState): GameState {
  const drawerUserId = selectDrawer(room);
  return {
    ...game,
    status: 'playing',
    round: game.round + 1,
    drawerUserId,
    previousDrawerUserId: drawerUserId,
    word: randomItem(words),
    guessedUserIds: new Set(),
    endsAt: Date.now() + env.GUESSING_MS,
  };
}

export async function startGame(room: RoomState): Promise<GameState> {
  if (room.hostUserId === '') throw new AppError('Room needs a host', 409);
  if (room.players.size < 2) throw new AppError('At least two players are required', 409);
  if (room.game) throw new AppError('A game is already in progress', 409);

  const record = await prisma.game.create({ data: { roomId: room.id, hostId: room.hostUserId } });
  for (const player of room.players.values()) player.score = 0;
  room.game = newRound(room, {
    id: record.id,
    status: 'playing',
    round: 0,
    totalRounds: env.GAME_ROUNDS,
    drawerUserId: '',
    word: '',
    guessedUserIds: new Set(),
    endsAt: 0,
  });
  return room.game;
}

export function markCorrectGuess(room: RoomState, userId: string, text: string): boolean {
  const game = room.game;
  if (!game || game.status !== 'playing' || game.drawerUserId === userId) return false;
  if (game.guessedUserIds.has(userId) || game.word.toLowerCase() !== text.trim().toLowerCase()) return false;
  game.guessedUserIds.add(userId);
  const player = room.players.get(userId);
  if (player) player.score += 100;
  return true;
}

export function setRoundTimer(room: RoomState, onRoundEnd: (room: RoomState, word: string) => void): void {
  const existing = timers.get(room.code);
  if (existing) clearTimeout(existing);
  timers.set(room.code, setTimeout(() => onRoundEnd(room, room.game?.word ?? ''), env.GUESSING_MS));
}

export function clearGameTimer(code: string): void {
  const timer = timers.get(code);
  if (timer) clearTimeout(timer);
  timers.delete(code);
}

export async function finishRound(room: RoomState): Promise<'next' | 'game-ended'> {
  const game = room.game;
  if (!game) throw new AppError('No active game', 409);
  clearGameTimer(room.code);
  if (game.round >= game.totalRounds) {
    await prisma.game.update({ where: { id: game.id }, data: { endedAt: new Date() } });
    delete room.game;
    return 'game-ended';
  }
  room.game = newRound(room, game);
  return 'next';
}

export function createMessageId(): string {
  return randomUUID();
}
