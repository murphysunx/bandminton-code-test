import { MatchUnit } from '@libs/match/entity';
import { Round } from '../../../../../libs/src/round/entity';
import { RankTool } from '../rank-tool/type';

export interface RoundCalculator {
  /**
   * get the next round
   * @param teamEnrolments match units
   * @param rounds round history
   */
  nextRound<U extends MatchUnit>(units: U[], rounds?: Round<U>[]): [U, U][];
}

export class RoundCalculatorAbstract implements RoundCalculator {
  constructor(public readonly rankTool: RankTool) {}

  nextRound<U extends MatchUnit>(units: U[], rounds?: Round<U>[]): [U, U][] {
    throw new Error('Method not implemented.');
  }
}
