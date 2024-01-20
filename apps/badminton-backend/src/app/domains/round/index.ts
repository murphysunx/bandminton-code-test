import { IMatch, IMatchResult } from '../match';
import { IPlayable } from '../player';

/**
 * a list of playables with their earned/lost points
 */
type RoundResult = {
  playable: IPlayable;
  points: number;
}[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IRound {
  readonly id: number;
  /**
   * list of matches in the round
   */
  matches: IMatch[];
  /**
   * calculate players' points in the round
   * @param matchResults list of match results
   */
  calculateRoundResults(matchResults: IMatchResult[]): RoundResult;
}
