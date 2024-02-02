import { Rankable } from '@libs/player';
import * as _ from 'lodash';

const MAX_RANK_DIFF = 10;

/**
 * sort rankables by wins and points
 * @param rankables rankable items
 * @returns sorted rankables
 */
export function rank<T extends { id: number }>(
  rankables: Rankable<T>[]
): Rankable<T>[] {
  return rankables.sort((a, b) => {
    if (a.wins === b.wins) {
      return b.points - a.points;
    }
    return b.wins - a.wins;
  });
}

// dfs
function dfs<T>(
  players: T[],
  potentials: [T, T[]][],
  matched: Set<T>,
  matches: [T, T][] = []
): [T, T][] {
  // exit condition
  if (matched.size === players.length || potentials.length === 0) {
    return matches;
  }
  const [player, possibleOpponents] = potentials[0];
  if (matched.has(player)) {
    return dfs(players, potentials.slice(1), matched, matches);
  } else {
    for (const opponent of possibleOpponents) {
      if (matched.has(opponent)) {
        continue;
      }
      // opponent is not matched yet
      matches.push([player, opponent]);
      matched.add(player);
      matched.add(opponent);
      const result = dfs(players, potentials.slice(1), matched, matches);
      if (result.length === players.length / 2) {
        return result;
      } else {
        matches.pop();
        matched.delete(player);
        matched.delete(opponent);
      }
    }
    return matches;
  }
}

export function pairForNextRound<T extends { id: number }>(
  rankables: Rankable<T>[]
): [T, T][] {
  const rankableDict = _.keyBy(rankables, (r) => r.rankable.id);
  const ranks = rank<T>(rankables);
  const possibleOpponentsDict: { [key: number]: T[] } = {};
  ranks.forEach((player) => {
    const playerRank = ranks.findIndex((r) => r === player);
    const minRank = Math.max(0, playerRank - MAX_RANK_DIFF);
    const maxRank = Math.min(ranks.length - 1, playerRank + MAX_RANK_DIFF);
    const possibleOpponents = ranks
      .slice(minRank, maxRank + 1)
      .filter(
        (r) =>
          // exclude self
          r !== player &&
          // exclude players already played
          !player.history.has(r.rankable)
      )
      .map((r) => r.rankable);
    possibleOpponentsDict[player.rankable.id] = possibleOpponents;
  });
  const potentials = Object.entries(possibleOpponentsDict)
    .sort((a, b) => {
      return a[1].length - b[1].length;
    })
    .map(([id, opponents]) => {
      return [rankableDict[+id].rankable, opponents] as [T, T[]];
    });
  const results = dfs<T>(
    ranks.map((r) => r.rankable),
    potentials,
    new Set()
  );
  if (results.length !== ranks.length / 2) {
    throw new Error('Cannot generate matches');
  } else {
    return results;
  }
}
