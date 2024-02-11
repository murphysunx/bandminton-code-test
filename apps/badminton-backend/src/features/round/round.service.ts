import { IPlayer, Rankable, RankedPlayer, RankedTeam } from '@libs/player';
import { TournamentDoubleRound, TournamentSingleRound } from '@libs/round';
import { Team } from '@libs/team-enrolment';
import { MIN_PLAYERS, isEvenArray } from '@libs/tournament';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchService } from '../match/match.service';
import { pairForNextRound, rank } from './core';
import { validateMatchScores } from '@libs/match';

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

  async createSingleRound(
    tournamentId: number
  ): Promise<TournamentSingleRound> {
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
        const singleRankables = players.map((p) => {
          return new Rankable(p);
        });
        const pairedSingleMatches = pairForNextRound(singleRankables);
        const singleMatches = await Promise.all(
          pairedSingleMatches.map(async ([player1, player2]) => {
            const match = await this.matchService.createSingle(
              tournamentId,
              singleRound.id,
              player1.id,
              player2.id
            );
            return match;
          })
        );
        const ranked = rank(singleRankables);
        await this.prisma.tournament.update({
          where: {
            id: tournamentId,
          },
          data: {
            state: 'STARTED',
          },
        });
        return {
          id: singleRound.id,
          index: singleRound.index,
          matches: singleMatches,
          state: singleRound.state,
          rank: ranked.map((r) => {
            return {
              player: players.find((p) => p === r.rankable),
              wins: r.wins,
              points: r.points,
            };
          }),
        };
      } else {
        throw new Error('Invalid number of players to create a single round');
      }
    } else {
      const selectedPlayers = await this.prisma.tournamentPlayer.findMany({
        where: {
          tournamentId,
        },
        select: {
          player: true,
        },
      });
      const latestRound = await this.prisma.round.findFirst({
        where: {
          tournamentId,
          matchType: 'SINGLE',
          state: 'FINISHED',
        },
        orderBy: {
          index: 'desc',
        },
        take: 1,
      });
      const singleRound = await this.prisma.round.create({
        data: {
          tournamentId,
          matchType: 'SINGLE',
          index: latestRound.index + 1,
        },
      });
      const players = selectedPlayers.map((p) => p.player);
      const singleRankables = players.map((p) => {
        return new Rankable<IPlayer>(p);
      });
      const finishedRounds = await this.prisma.round.findMany({
        where: {
          tournamentId,
          matchType: 'SINGLE',
          state: 'FINISHED',
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
              state: true,
            },
          },
        },
      });
      for (const round of finishedRounds) {
        for (const match of round.matches) {
          if (match.state !== 'OVER') {
            throw new Error('Match not finished in a finished round');
          }
          if (match.player1Score !== null && match.player2Score !== null) {
            const player1 = singleRankables.find(
              (r) => r.rankable.id === match.player1.id
            );
            const player2 = singleRankables.find(
              (r) => r.rankable.id === match.player2.id
            );
            if (player1 && player2) {
              if (match.player1Score > match.player2Score) {
                player1.addWin(
                  player2.rankable,
                  match.player1Score - match.player2Score
                );
                player2.addLose(
                  player1.rankable,
                  match.player1Score - match.player2Score
                );
              } else if (match.player1Score < match.player2Score) {
                player2.addWin(
                  player1.rankable,
                  match.player2Score - match.player1Score
                );
                player1.addLose(
                  player2.rankable,
                  match.player2Score - match.player1Score
                );
              } else {
                throw new Error('Cannot have a draw in a single match');
              }
            } else {
              throw new Error('Player not found');
            }
          }
        }
      }
      const pairedSingleMatches = pairForNextRound(singleRankables);
      const singleMatches = await Promise.all(
        pairedSingleMatches.map(async ([player1, player2]) => {
          const match = await this.matchService.createSingle(
            tournamentId,
            singleRound.id,
            player1.id,
            player2.id
          );
          return match;
        })
      );
      const ranked = rank(singleRankables);
      await this.prisma.tournament.update({
        where: {
          id: tournamentId,
        },
        data: {
          state: 'STARTED',
        },
      });
      return {
        id: singleRound.id,
        index: singleRound.index,
        matches: singleMatches,
        state: singleRound.state,
        rank: ranked.map((r) => {
          return {
            player: players.find((p) => p === r.rankable),
            wins: r.wins,
            points: r.points,
          };
        }),
      };
    }
  }

  async createDoubleRound(
    tournamentId: number
  ): Promise<TournamentDoubleRound> {
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
        const doubleRankables = teams.map((t) => {
          return new Rankable(t);
        });
        const pairedDoubleMatches = pairForNextRound(doubleRankables);
        const doubleMatches = await Promise.all(
          pairedDoubleMatches.map(async ([team1, team2]) => {
            const match = await this.matchService.createDouble(
              doubleRound.id,
              team1.id,
              team2.id
            );
            return match;
          })
        );
        const ranked = rank(doubleRankables).map((r) => {
          return {
            team: teams.find((t) => t === r.rankable),
            wins: r.wins,
            points: r.points,
          };
        });
        return {
          id: doubleRound.id,
          index: doubleRound.index,
          matches: doubleMatches,
          state: doubleRound.state,
          rank: ranked,
        };
      } else {
        throw new Error('Invalid number of teams to create a double round');
      }
    } else {
      throw new Error('Not implemented');
    }
  }

  private async getLiveSingleRank(
    tournamentId: number
  ): Promise<RankedPlayer[]> {
    const selectedPlayers = await this.prisma.tournamentPlayer.findMany({
      where: {
        tournamentId,
      },
      select: {
        player: true,
      },
    });
    const players = selectedPlayers.map((p) => p.player);
    const singleRankables = players.map((p) => {
      return new Rankable<IPlayer>(p);
    });
    const finishedRounds = await this.prisma.round.findMany({
      where: {
        tournamentId,
        matchType: 'SINGLE',
        state: 'FINISHED',
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
            state: true,
          },
        },
      },
    });
    for (const round of finishedRounds) {
      for (const match of round.matches) {
        if (match.state !== 'OVER') {
          throw new Error('Match not finished in a finished round');
        }
        if (match.player1Score !== null && match.player2Score !== null) {
          const player1 = singleRankables.find(
            (r) => r.rankable.id === match.player1.id
          );
          const player2 = singleRankables.find(
            (r) => r.rankable.id === match.player2.id
          );
          if (player1 && player2) {
            if (match.player1Score > match.player2Score) {
              player1.addWin(
                player2.rankable,
                match.player1Score - match.player2Score
              );
              player2.addLose(
                player1.rankable,
                match.player1Score - match.player2Score
              );
            } else if (match.player1Score < match.player2Score) {
              player2.addWin(
                player1.rankable,
                match.player2Score - match.player1Score
              );
              player1.addLose(
                player2.rankable,
                match.player2Score - match.player1Score
              );
            } else {
              throw new Error('Cannot have a draw in a single match');
            }
          } else {
            throw new Error('Player not found');
          }
        }
      }
    }
    const ranked = rank(singleRankables);
    return ranked.map((r) => {
      return {
        player: r.rankable,
        wins: r.wins,
        points: r.points,
      };
    });
  }

  private async getLiveDoubleRank(tournamentId: number): Promise<RankedTeam[]> {
    const teams = await this.prisma.tournamentTeam.findMany({
      where: {
        tournamentId,
      },
      select: {
        id: true,
        player1: true,
        player2: true,
      },
    });

    const teamRankables = teams.map((p) => {
      return new Rankable<Team>(p);
    });
    const finishedRounds = await this.prisma.round.findMany({
      where: {
        tournamentId,
        matchType: 'DOUBLE',
        state: 'FINISHED',
      },
      select: {
        id: true,
        matches: {
          select: {
            id: true,
            team1Id: true,
            team2Id: true,
            player1Score: true,
            player2Score: true,
            state: true,
          },
        },
      },
    });
    for (const round of finishedRounds) {
      for (const match of round.matches) {
        if (match.state !== 'OVER') {
          throw new Error('Match not finished in a finished round');
        }
        if (match.player1Score !== null && match.player2Score !== null) {
          const team1 = teamRankables.find(
            (r) => r.rankable.id === match.team1Id
          );
          const team2 = teamRankables.find(
            (r) => r.rankable.id === match.team2Id
          );
          if (team1 && team2) {
            if (match.player1Score > match.player2Score) {
              team1.addWin(
                team2.rankable,
                match.player1Score - match.player2Score
              );
              team2.addLose(
                team1.rankable,
                match.player1Score - match.player2Score
              );
            } else if (match.player1Score < match.player2Score) {
              team2.addWin(
                team1.rankable,
                match.player2Score - match.player1Score
              );
              team1.addLose(
                team2.rankable,
                match.player2Score - match.player1Score
              );
            } else {
              throw new Error('Cannot have a draw in a single match');
            }
          } else {
            throw new Error('Player not found');
          }
        }
      }
    }
    const ranked = rank(teamRankables);
    return ranked.map((r) => {
      return {
        team: r.rankable,
        wins: r.wins,
        points: r.points,
      };
    });
  }

  async latestSingleRound(
    tournamentId: number
  ): Promise<TournamentSingleRound> {
    const singleRound = await this.prisma.round.findFirst({
      where: {
        tournamentId,
        matchType: 'SINGLE',
      },
      orderBy: {
        index: 'desc',
      },
      select: {
        id: true,
        index: true,
        matches: {
          select: {
            id: true,
            player1: true,
            player2: true,
            player1Score: true,
            player2Score: true,
            state: true,
          },
        },
        state: true,
      },
    });
    const players = await this.getLiveSingleRank(tournamentId);
    return { ...singleRound, rank: players };
  }

  async latestDoubleRound(
    tournamentId: number
  ): Promise<TournamentDoubleRound> {
    const doubleRound = await this.prisma.round.findFirst({
      where: {
        tournamentId,
        matchType: 'DOUBLE',
      },
      orderBy: {
        index: 'desc',
      },
      select: {
        id: true,
        index: true,
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
            state: true,
          },
        },
        state: true,
      },
    });
    if (!doubleRound) {
      throw new Error('No double round found');
    }
    const ranked = await this.getLiveDoubleRank(tournamentId);
    return {
      ...doubleRound,
      matches: doubleRound.matches.map((match) => {
        return {
          ...match,
          team1Score: match.player1Score,
          team2Score: match.player2Score,
        };
      }),
      rank: ranked,
    };
  }

  async continueToNextRound(tournamentId: number, roundId: number) {
    const round = await this.prisma.round.findFirst({
      where: {
        id: roundId,
      },
    });
    if (!round) {
      throw new Error('Round not found');
    }
    console.log('round', round);

    if (round.tournamentId !== tournamentId) {
      throw new Error('Round does not belong to the tournament');
    }
    if (round.state === 'FINISHED') {
      throw new Error('Round already finished');
    }
    const matches = await this.prisma.match.findMany({
      where: {
        roundId,
      },
    });
    if (
      !matches.every((m) => validateMatchScores(m.player1Score, m.player2Score))
    ) {
      throw new Error('Some match scores are invalid');
    }
    await this.prisma.match.updateMany({
      where: { roundId },
      data: {
        state: 'OVER',
      },
    });
    await this.prisma.round.update({
      where: {
        id: roundId,
      },
      data: {
        state: 'FINISHED',
      },
    });
    if (round.matchType === 'SINGLE') {
      const nextRound = await this.createSingleRound(tournamentId);
      return nextRound;
    } else if (round.matchType === 'DOUBLE') {
      const nextRound = await this.createDoubleRound(tournamentId);
      return nextRound;
    } else {
      throw new Error('Invalid match type');
    }
  }
}
