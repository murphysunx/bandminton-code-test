import { IJudge, IPlayUnit } from '../../play-unit/type';

export interface IJudgeProfile {
  /**
   * judge of the match
   */
  judge: IJudge;
  /**
   * whether the judge acknowledges the match and its result
   */
  signed: boolean;
}

export interface ICompetitorProfile<T extends IPlayUnit> {
  /**
   * competitor in the match (either a player or a team)
   */
  competitor: T;
  /**
   * score of the competitor
   */
  score: number;
  /**
   * whether the competitor acknowledges the match and its result
   */
  signed: boolean;
}

export interface IMatch<T extends IPlayUnit = IPlayUnit> {
  /**
   * judge of the match
   */
  judge: IJudgeProfile;
  /**
   * fist competitor in the match (either a player or a team)
   */
  competitor1: ICompetitorProfile<T>;
  /**
   * second competitor in the match (either a player or a team)
   */
  competitor2: ICompetitorProfile<T>;
  /**
   * update the score of the competitor
   * @param competitor competitor in the match (either a player or a team)
   * @param score score of the competitor
   */
  updateScore(competitor: T, score: number): void;
  /**
   * get the winner of the match
   */
  getWiner(): ICompetitorProfile<T> | null;
  /**
   * get the loser of the match
   */
  getLoser(): ICompetitorProfile<T> | null;
}

interface IScoredPlayable {
  playeable: IPlayUnit;
  score: number;
}

export interface IMatchResult {
  winner: IScoredPlayable;
  loser: IScoredPlayable;
}
