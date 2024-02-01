import { IRankable } from '@libs/player';
import { RoundMatch } from '@libs/round';

const MAX_RANK_DIFF = 10;

/**
 * sort rankables by wins and points
 * @param rankables rankable items
 * @returns sorted rankables
 */
export function rank<T extends IRankable>(rankables: T[]): T[] {
  return rankables.sort((a, b) => {
    if (a.wins === b.wins) {
      return b.points - a.points;
    }
    return b.wins - a.wins;
  });
}

type PlayerName = number;
type PotentialOpponents = PlayerName[];
// dfs
function dfs(
  players: PlayerName[],
  potentials: [PlayerName, PotentialOpponents][],
  matched: Set<PlayerName>,
  matches: [PlayerName, PlayerName][] = []
): RoundMatch[] {
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

export function pairForNextRound<T extends IRankable>(
  rankables: T[]
): RoundMatch[] {
  const ranks = rank<T>(rankables);
  const possibleOpponentsDict: { [key: number]: number[] } = {};
  ranks.forEach((player) => {
    const playerRank = ranks.findIndex((r) => r.id === player.id);
    const minRank = Math.max(0, playerRank - MAX_RANK_DIFF);
    const maxRank = Math.min(ranks.length - 1, playerRank + MAX_RANK_DIFF);
    const possibleOpponents = ranks
      .slice(minRank, maxRank + 1)
      .filter(
        (r) =>
          // exclude self
          r.id !== player.id &&
          // exclude players already played
          player.history.findIndex((v) => v.id === r.id) === -1
      )
      .map((r) => r.id);
    possibleOpponentsDict[player.id] = possibleOpponents;
  });
  const potentials = Object.entries(possibleOpponentsDict)
    .sort((a, b) => {
      return a[1].length - b[1].length;
    })
    .map(([id, opponents]) => {
      return [Number(id), opponents] as [number, number[]];
    });
  const results = dfs(
    ranks.map((r) => r.id),
    potentials,
    new Set()
  );
  if (results.length !== ranks.length / 2) {
    throw new Error('Cannot generate matches');
  } else {
    return results;
  }
}
