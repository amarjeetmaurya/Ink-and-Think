export interface Player {
  userId: string;
  username: string;
  socketId: string;
  score: number;
}

export interface GameState {
  id: string;
  status: 'playing' | 'revealing';
  round: number;
  totalRounds: number;
  drawerUserId: string;
  word: string;
  guessedUserIds: Set<string>;
  endsAt: number;
  previousDrawerUserId?: string;
}

export interface RoomState {
  id: string;
  code: string;
  hostUserId: string;
  maxPlayers: number;
  players: Map<string, Player>;
  game?: GameState;
}

export interface RoomView {
  code: string;
  hostUserId: string;
  maxPlayers: number;
  players: Array<Omit<Player, 'socketId'>>;
  game: null | {
    status: GameState['status'];
    round: number;
    totalRounds: number;
    drawerUserId: string;
    endsAt: number;
  };
}
