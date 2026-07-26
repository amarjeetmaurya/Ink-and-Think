import { z } from 'zod';

export const createRoomSchema = z.object({
  maxPlayers: z.number().int().min(2).max(12).default(8),
});

export const joinRoomSchema = z.object({
  code: z.string().trim().length(6).transform((code) => code.toUpperCase()),
});
