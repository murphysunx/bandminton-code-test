import { IPlayable } from '../player';

export interface IMatch {
  /**
   * fist competitor in the match (either a player or a team)
   */
  competitor1: IPlayable;
  /**
   * second competitor in the match (either a player or a team)
   */
  competitor2: IPlayable;
  /**
   * result of the match
   */
  result: IMatchResult;
}

interface IScoredPlayable {
  playeable: IPlayable;
  score: number;
}

export interface IMatchResult {
  winner: IScoredPlayable;
  loser: IScoredPlayable;
}
