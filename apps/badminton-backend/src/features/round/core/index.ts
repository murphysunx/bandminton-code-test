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

type PlayerName = string;
type PotentialOpponents = PlayerName[];
// dfs
function dfs(
  players: PlayerName[],
  potentials: [PlayerName, PotentialOpponents][],
  matched: Set<PlayerName>,
  matches: [PlayerName, PlayerName][] = []
) {
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
  const possibleOpponentsDict: { [key: string]: string[] } = {};
  ranks.forEach((player) => {
    const playerRank = ranks.findIndex((r) => r.name === player.name);
    const minRank = Math.max(0, playerRank - MAX_RANK_DIFF);
    const maxRank = Math.min(ranks.length - 1, playerRank + MAX_RANK_DIFF);
    const possibleOpponents = ranks
      .slice(minRank, maxRank + 1)
      .filter(
        (r) =>
          // exclude self
          r.name !== player.name &&
          // exclude players already played
          player.history.findIndex((v) => v.name === r.name) === -1
      )
      .map((r) => r.name);
    possibleOpponentsDict[player.name] = possibleOpponents;
  });
  const potentials = Object.entries(possibleOpponentsDict).sort((a, b) => {
    return a[1].length - b[1].length;
  });
  const results = dfs(
    ranks.map((r) => r.name),
    potentials,
    new Set()
  );
  if (results.length !== ranks.length / 2) {
    throw new Error('Cannot generate matches');
  } else {
    return results;
  }
}
