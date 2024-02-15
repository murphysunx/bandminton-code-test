import { MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';

export interface RankRecord<U extends MatchUnit> {
  unit: U;
  rankDetail: unknown;
}

export interface RankTool {
  /**
   * rank the units based on the rounds
   * @param enrolments enrolments
   * @param rounds round history
   */
  rank<U extends MatchUnit>(
    enrolments: U[],
    rounds?: Round<U>[]
  ): RankRecord<U>[];
}

export abstract class RankToolAbstract implements RankTool {
  abstract rank<U extends MatchUnit>(
    enrolments: U[],
    rounds?: Round<U>[]
  ): RankRecord<U>[];
}
