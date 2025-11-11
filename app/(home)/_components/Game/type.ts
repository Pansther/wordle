export type GameFormValues = Record<string, string>;

export enum GameState {
  Idle,
  Play,
  Win,
  Lost,
}
