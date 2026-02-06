
export enum GameStatus {
  HOME = 'HOME',
  PLAYING = 'PLAYING',
  WON = 'WON',
  GAMEOVER = 'GAMEOVER'
}

export interface GameState {
  targetNumber: number;
  attempts: number;
  history: number[];
  lastGuess: number | null;
  feedback: string;
  status: GameStatus;
  startTime: number | null;
  endTime: number | null;
}
