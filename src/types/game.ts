export interface Game {
  gameId: string;
  lives: number;
  gold: number;
  level: number;
  score: number;
  highScore: number;
  turn: number;
  playerName: string;
  playerId: string;
  createdAt: Date;
}

export interface StartGameRequest {
  playerName: string
}

export interface APIError {
  message: string
  status: number
  type?: string
}

export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: APIError }
