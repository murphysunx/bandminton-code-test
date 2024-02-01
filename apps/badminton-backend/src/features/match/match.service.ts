import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a single match in a round
   * @param tournamentId tournament id
   * @param roundId round id
   * @param matchType match type (single or double)
   * @param player1Id
   * @param player2Id
   * @returns created single match
   */
  async createSingle(
    tournamentId: number,
    roundId: number,
    player1Id: number,
    player2Id: number
  ) {
    // check if round exists and belongs to the tournament
    const round = await this.prisma.round.findFirst({
      where: {
        id: roundId,
        tournamentId,
      },
    });
    if (!round) {
      throw new Error('Round not found');
    }
    if (round.tournamentId !== tournamentId) {
      throw new Error('Round does not belong to the tournament');
    }
    if (round.matchType !== 'SINGLE') {
      throw new Error('Cannot create a single match in a double round');
    }
    const player1 = await this.prisma.player.findFirst({
      where: {
        id: player1Id,
      },
    });
    if (!player1) {
      throw new Error('Player 1 not found');
    }
    const player2 = await this.prisma.player.findFirst({
      where: {
        id: player2Id,
      },
    });
    if (!player2) {
      throw new Error('Player 2 not found');
    }
    if (player1Id === player2Id) {
      throw new Error('Player cannot play with himself');
    }
    const match = await this.prisma.match.create({
      data: {
        roundId,
        player1Id: player1Id,
        player2Id: player2Id,
        player1Score: void 0,
        player2Score: void 0,
        matchType: 'SINGLE',
      },
      select: {
        id: true,
        player1: true,
        player2: true,
        player1Score: true,
        player2Score: true,
      },
    });
    return match;
  }

  /**
   * create a double match in a round
   * @param tournamentId tournament id
   * @param roundId round id
   * @param team1Id team 1 id
   * @param team2Id team 2 id
   * @returns created double match
   */
  async createDouble(roundId: number, team1Id: number, team2Id: number) {
    // check if round exists and belongs to the tournament
    const round = await this.prisma.round.findFirst({
      where: {
        id: roundId,
      },
    });
    if (!round) {
      throw new Error('Round not found');
    }
    if (round.matchType !== 'DOUBLE') {
      throw new Error('Cannot create a double match in a single round');
    }
    const team1 = await this.prisma.tournamentTeam.findFirst({
      where: {
        id: team1Id,
      },
      select: {
        id: true,
        player1: true,
        player2: true,
      },
    });
    if (!team1) {
      throw new Error('Team 1 not found');
    }
    const team2 = await this.prisma.tournamentTeam.findFirst({
      where: {
        id: team2Id,
      },
      select: {
        id: true,
        player1: true,
        player2: true,
      },
    });
    if (!team2) {
      throw new Error('Team 2 not found');
    }
    if (team1Id === team2Id) {
      throw new Error('A team cannot play with itself');
    }
    const match = await this.prisma.match.create({
      data: {
        roundId,
        team1Id: team1Id,
        team2Id: team2Id,
        player1Score: void 0,
        player2Score: void 0,
        matchType: 'DOUBLE',
      },
    });
    return {
      id: match.id,
      team1: team1,
      team2: team2,
      team1Score: match.player1Score,
      team2Score: match.player2Score,
    };
  }

  /**
   * update match score
   * @param matchId match id
   * @param player1Score player1 score
   * @param player2Score player2 score
   * @returns updated match
   */
  async updateScore(
    matchId: number,
    player1Score: number,
    player2Score: number
  ) {
    const match = await this.prisma.match.update({
      where: {
        id: matchId,
      },
      data: {
        player1Score,
        player2Score,
      },
    });
    return match;
  }
}
