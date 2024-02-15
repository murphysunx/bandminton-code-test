import { MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';
import { keyBy } from 'lodash';
import { RankTool } from '../rank-tool/type';
import { RoundCalculator } from './type';

function getPlayHistory<U extends MatchUnit>(
  units: U[],
  rounds?: Round<U>[]
): { [key: number]: U[] } {
  const history: { [key: number]: U[] } = {};
  units.forEach((unit) => {
    history[unit.id] = [];
  });
  if (!rounds) return history;
  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      history[match.enrolment1.id].push(match.enrolment2);
      history[match.enrolment2.id].push(match.enrolment1);
    });
  });
  return history;
}

export class BFSRoundCalculator implements RoundCalculator {
  constructor(
    public readonly rankDiff: number,
    public readonly rankTool: RankTool
  ) {}

  nextRound<U extends MatchUnit>(units: U[], rounds?: Round<U>[]): [U, U][] {
    const rankRecords = this.rankTool.rank(units, rounds);
    const recordDict = keyBy(rankRecords, (r) => r.unit.id);
    const possibleOpponentDict: { [key: number]: U[] } = {};
    const playHistory = getPlayHistory<U>(units, rounds);
    rankRecords.forEach((record, i) => {
      const minIndex = Math.max(0, i - this.rankDiff);
      const maxIndex = Math.min(rankRecords.length - 1, i + this.rankDiff);
      const history = playHistory[record.unit.id];
      const possibleOpponents = rankRecords
        .slice(minIndex, maxIndex + 1)
        .filter((r) => {
          // exclude self and already played opponents
          return r !== record && !history.includes(r.unit);
        })
        .map((r) => r.unit);
      possibleOpponentDict[record.unit.id] = possibleOpponents;
    });
    const matchable = Object.entries(possibleOpponentDict)
      .sort((a, b) => {
        return a[1].length - b[1].length;
      })
      .map(([id, opponents]) => {
        return [recordDict[+id].unit, opponents] as [U, U[]];
      });
    const matches = this.dfs(matchable, new Set<U>());
    return matches;
  }

  private dfs<U extends MatchUnit>(
    items: [U, U[]][],
    matched: Set<U>
  ): [U, U][] {
    if (items.length === 0) {
      return [];
    }
    const [player, possibleOpponents] = items[0];
    for (const opponent of possibleOpponents) {
      if (matched.has(opponent)) {
        // ignore opponent already matched
        continue;
      }
      const match: [U, U] = [player, opponent];
      matched.add(player);
      matched.add(opponent);
      const newItems = items.filter(
        (i) => i[0] !== player && i[0] !== opponent
      );
      const newMatches = this.dfs(newItems, matched);
      if (newMatches.length === newItems.length / 2) {
        // all rest players are matched
        return [match, ...newMatches];
      } else {
        matched.delete(player);
        matched.delete(opponent);
      }
    }
    throw new Error('No possible matches');
  }
}
