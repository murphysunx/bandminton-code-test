import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MIN_PLAYERS, isEvenArray } from '@libs/tournament';
import { IRankable } from '@libs/player';
import { ISingleMatch, IDoubleMatch } from '@libs/match';
import { pairForNextRound } from './core';
import { MatchService } from '../match/match.service';
import { TournamentRound } from '@libs/round';

@Injectable()
export class RoundService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly matchService: MatchService
  ) {}

  async isRoundFinished(roundId: number) {
    const matches = await this.prisma.match.findMany({
      where: {
        roundId,
      },
    });
    return matches.every(
      (match) => match.player1Score !== null && match.player2Score !== null
    );
  }

  async createSingleRound(tournamentId: number) {
    const tournament = await this.prisma.tournament.findFirst({
      where: {
        id: tournamentId,
      },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    if (tournament.state === 'ENDED') {
      throw new Error('Cannot create round for a tournament that is finished');
    }
    const selectedPlayers = await this.prisma.tournamentPlayer.findMany({
      where: {
        tournamentId,
      },
      select: {
        player: true,
      },
    });
    const players = selectedPlayers.map((p) => p.player);

    if (tournament.state === 'CREATED') {
      // first round
      if (players.length >= MIN_PLAYERS && isEvenArray(players)) {
        const singleRound = await this.prisma.round.create({
          data: {
            tournamentId,
            matchType: 'SINGLE',
          },
        });
        const singleRankables: IRankable[] = players.map((p) => {
          return {
            id: p.id,
            wins: 0,
            points: 0,
            history: [],
          };
        });
        const pairedSingleMatches = pairForNextRound(singleRankables);
        const singleMatches = await Promise.all(
          pairedSingleMatches.map(async ([player1Id, player2Id]) => {
            const match = await this.matchService.createSingle(
              tournamentId,
              singleRound.id,
              player1Id,
              player2Id
            );
            return match;
          })
        );
        return {
          id: singleRound.id,
          matches: singleMatches,
        };
      } else {
        throw new Error('Invalid number of players to create a single round');
      }
    } else {
      throw new Error('Not implemented');
    }
  }

  async createDoubleRound(tournamentId: number) {
    const tournament = await this.prisma.tournament.findFirst({
      where: {
        id: tournamentId,
      },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    if (tournament.state === 'ENDED') {
      throw new Error('Cannot create round for a tournament that is finished');
    }
    const selectedTeams = await this.prisma.tournamentTeam.findMany({
      where: {
        tournamentId,
      },
      select: {
        id: true,
        player1: true,
        player2: true,
      },
    });

    const teams = selectedTeams.map((t) => {
      return {
        id: t.id,
        player1: t.player1,
        player2: t.player2,
      };
    });

    if (tournament.state === 'CREATED') {
      if (teams.length >= MIN_PLAYERS && isEvenArray(teams)) {
        const doubleRound = await this.prisma.round.create({
          data: {
            tournamentId,
            matchType: 'DOUBLE',
          },
        });
        const doubleRankables: IRankable[] = teams.map((t) => {
          return {
            id: t.id,
            wins: 0,
            points: 0,
            history: [],
          };
        });
        const pairedDoubleMatches = pairForNextRound(doubleRankables);
        const doubleMatches = await Promise.all(
          pairedDoubleMatches.map(async ([team1Id, team2Id]) => {
            const match = await this.matchService.createDouble(
              doubleRound.id,
              team1Id,
              team2Id
            );
            return match;
          })
        );
        return {
          id: doubleRound.id,
          matches: doubleMatches,
        };
      } else {
        throw new Error('Invalid number of teams to create a double round');
      }
    } else {
      throw new Error('Not implemented');
    }
  }

  async latestSingleRound(
    tournamentId: number
  ): Promise<TournamentRound<ISingleMatch>> {
    const singleRound = await this.prisma.round.findFirst({
      where: {
        tournamentId,
        matchType: 'SINGLE',
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        matches: {
          select: {
            id: true,
            player1: true,
            player2: true,
            player1Score: true,
            player2Score: true,
          },
        },
      },
    });
    return singleRound;
  }

  async latestDoubleRound(
    tournamentId: number
  ): Promise<TournamentRound<IDoubleMatch>> {
    const doubleRound = await this.prisma.round.findFirst({
      where: {
        tournamentId,
        matchType: 'DOUBLE',
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        matches: {
          select: {
            id: true,
            team1: {
              select: {
                id: true,
                player1: true,
                player2: true,
              },
            },
            team2: {
              select: {
                id: true,
                player1: true,
                player2: true,
              },
            },
            player1Score: true,
            player2Score: true,
          },
        },
      },
    });
    return doubleRound;
  }
}
