export interface IMatchPlayer {
  name: string;
  score: number;
}

export interface IMatch {
  player1: IMatchPlayer;
  player2: IMatchPlayer;
}

export interface IRound {
  index: number;
  matches: IMatch[];
}
