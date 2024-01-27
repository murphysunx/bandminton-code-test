export interface IMatchPlayerResult {
  name: string;
  score: number;
}

export interface IMatchResult {
  player1: IMatchPlayerResult;
  player2: IMatchPlayerResult;
}
