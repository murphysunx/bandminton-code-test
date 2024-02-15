import { MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';
import { keyBy } from 'lodash';
import { RankRecord, RankTool } from './type';

type BasicRankRecordDetail = { wins: number; netPoints: number };

export interface BasicRankRecord<U extends MatchUnit> extends RankRecord<U> {
  unit: U;
  rankDetail: BasicRankRecordDetail;
}

export class BasicRankTool implements RankTool {
  private convertToBasicRankRecords<U extends MatchUnit>(
    units: U[],
    rounds?: Round<U>[]
  ): BasicRankRecord<U>[] {
    if (units.length === 0 || !rounds) return [];
    const rankRecords = units.map((unit) => ({
      unit,
      wins: 0,
      netPoints: 0,
    }));
    const rankRecordDict = keyBy(rankRecords, (r) => r.unit.id);
    for (const round of rounds) {
      for (const match of round.matches) {
        const unit1 = match.enrolment1;
        const unit2 = match.enrolment2;
        const record1 = rankRecordDict[unit1.id];
        const record2 = rankRecordDict[unit2.id];
        if (match.winner === unit1) {
          record1.wins++;
          record1.netPoints += match.scoreDiff;
          record2.netPoints -= match.scoreDiff;
        } else if (match.winner === unit2) {
          record2.wins++;
          record2.netPoints += match.scoreDiff;
          record1.netPoints -= match.scoreDiff;
        }
      }
    }
    return rankRecords.map((r) => {
      return {
        unit: r.unit,
        rankDetail: {
          wins: r.wins,
          netPoints: r.netPoints,
        },
      };
    });
  }

  rank<U extends MatchUnit>(
    enrolments: U[],
    rounds?: Round<U>[]
  ): BasicRankRecord<U>[] {
    const rankRecords = this.convertToBasicRankRecords(enrolments, rounds);
    const ranked = rankRecords.sort((a, b) => {
      if (a.rankDetail.wins === b.rankDetail.wins) {
        return b.rankDetail.netPoints - a.rankDetail.netPoints;
      }
      return b.rankDetail.wins - a.rankDetail.wins;
    });
    return ranked;
  }
}
