import { Player, Rankable } from '../player';

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

type RoundResult = MatchResult[];

type RoundMatch = [string, string];

type RankRecord = {
  name: string;
  primaryPoints: number;
  secondaryPoints: number;
};

export class MatchGenerator {
  playerDict: { [key: string]: Rankable };

  constructor(private roundResults: [RoundResult, RoundResult]) {
    const [round1Result, round2Result] = roundResults;
    const playerDict: { [key: string]: Rankable } = {};
    // create players and add wins and loses from round 1
    for (const matchResult of round1Result) {
      const { winner, loser, points } = matchResult;
      const winnedPlayer = new Player(winner);
      const lostPlayer = new Player(loser);
      winnedPlayer.addWin(lostPlayer, points);
      lostPlayer.addLose(winnedPlayer, points);
      playerDict[winner] = winnedPlayer;
      playerDict[loser] = lostPlayer;
    }
    // add wins and loses from round 2
    for (const matchResult of round2Result) {
      const { winner, loser, points } = matchResult;
      const winnedPlayer = playerDict[winner];
      const lostPlayer = playerDict[loser];
      winnedPlayer.addWin(lostPlayer, points);
      lostPlayer.addLose(winnedPlayer, points);
    }
    this.playerDict = playerDict;
  }

  /**
   * sort units descending by win first, then by points
   * @param rankables rankables
   * @returns sorted rankables
   */
  rank(): RankRecord[] {
    const players = Object.values(this.playerDict);
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
    throw new Error('Not implemented');
  }
}
