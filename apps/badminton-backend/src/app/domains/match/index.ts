import { IPlayUnit } from '../play-unit';

export interface IMatch {
  /**
   * fist competitor in the match (either a player or a team)
   */
  competitor1: IPlayUnit;
  /**
   * second competitor in the match (either a player or a team)
   */
  competitor2: IPlayUnit;
  /**
   * result of the match
   */
  result: IMatchResult;
}

interface IScoredPlayable {
  playeable: IPlayUnit;
  score: number;
}

export interface IMatchResult {
  winner: IScoredPlayable;
  loser: IScoredPlayable;
}
