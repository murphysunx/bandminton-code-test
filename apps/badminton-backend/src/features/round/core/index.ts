import { Player, Rankable } from '../../player';

type MatchResult = {
  /**
   * winner name
   */
  winner: string;
  /**
   * loser name
   */
  loser: string;
  /**
   * points earned by winner (also points lost by loser)
   */
  points: number;
};

export type RoundResult = MatchResult[];

type RoundMatch = [string, string];

type RankRecord = {
  name: string;
  primaryPoints: number;
  secondaryPoints: number;
};

const MAX_RANK_DIFF = 10;

function loadRoundResults(roundResults: RoundResult[]): {
  [key: string]: Rankable;
} {
  if (!roundResults || roundResults.length === 0) {
    throw new Error('Round results is empty');
  }
  const [firstRound, ...otherRounds] = roundResults;
  const playerDict: { [key: string]: Rankable } = {};
  // create players and add wins and loses from round 1
  for (const matchResult of firstRound) {
    const { winner, loser, points } = matchResult;
    const winnedPlayer = new Player(winner);
    const lostPlayer = new Player(loser);
    winnedPlayer.addWin(lostPlayer, points);
    lostPlayer.addLose(winnedPlayer, points);
    playerDict[winner] = winnedPlayer;
    playerDict[loser] = lostPlayer;
  }
  if (otherRounds && otherRounds.length > 0) {
    for (const roundResult of otherRounds) {
      for (const matchResult of roundResult) {
        const { winner, loser, points } = matchResult;
        const winnedPlayer = playerDict[winner];
        if (!winnedPlayer) {
          throw new Error(`Player ${winner} not found`);
        }
        const lostPlayer = playerDict[loser];
        if (!lostPlayer) {
          throw new Error(`Player ${loser} not found`);
        }
        winnedPlayer.addWin(lostPlayer, points);
        lostPlayer.addLose(winnedPlayer, points);
      }
    }
  }
  return playerDict;
}

export class RoundGenerator {
  #playerDict: { [key: string]: Rankable };

  get playerDict(): Readonly<{ [key: string]: Readonly<Rankable> }> {
    return this.#playerDict;
  }

  constructor(private roundResults: RoundResult[]) {
    this.#playerDict = loadRoundResults(this.roundResults);
  }

  /**
   * sort units descending by win first, then by points
   * @param rankables rankables
   * @returns sorted rankables
   */
  rank(): RankRecord[] {
    const players = Object.values(this.#playerDict);
    return players
      .sort((a, b) => {
        if (a.wins === b.wins) {
          return b.points - a.points;
        }
        return b.wins - a.wins;
      })
      .map((player) => ({
        name: player.name,
        primaryPoints: player.wins,
        secondaryPoints: player.points,
      }));
  }

  generateNextRound(): RoundMatch[] {
    // match players with rank difference <= 10 and never played before
    const ranks = this.rank();
    const players = Object.values(this.#playerDict);
    const possibleOpponentsDict: { [key: string]: string[] } = {};
    players.forEach((player) => {
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

    type PlayerName = string;
    type PotentialOpponents = PlayerName[];
    // dfs
    function dfs(
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
        return dfs(potentials.slice(1), matched, matches);
      } else {
        for (const opponent of possibleOpponents) {
          if (matched.has(opponent)) {
            continue;
          }
          // opponent is not matched yet
          matches.push([player, opponent]);
          matched.add(player);
          matched.add(opponent);
          const result = dfs(potentials.slice(1), matched, matches);
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
    const results = dfs(potentials, new Set());
    if (results.length !== players.length / 2) {
      throw new Error('Cannot generate matches');
    } else {
      return results;
    }
  }
}
