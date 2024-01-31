// import { IDoubleMatch, ISingleMatch } from '@libs/match';
import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { TournamentTeam, TournamentTeams } from '@libs/team';
import { CreateTournamentPayload, EnrolPlayerResponse } from '@libs/tournament';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}
  /**
   * creat a tournament
   * @param form tournament form
   * @returns
   */
  async create(form: CreateTournamentPayload) {
    return this.prisma.tournament.create({
      data: {
        name: form.name,
      },
    });
  }

  /**
   * enrol an exisiting player of the system to a tournament
   * @param tournamentId tournament id
   * @param playerId player id
   * @returns
   */
  async enrolPlayer(
    tournamentId: number,
    playerId: number
  ): Promise<EnrolPlayerResponse> {
    const tournament = await this.prisma.tournament.findFirst({
      where: {
        id: tournamentId,
      },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    const player = await this.prisma.player.findFirst({
      where: {
        id: playerId,
      },
    });
    if (!player) {
      throw new Error('Player not found');
    }
    const result = await this.prisma.tournamentPlayer.create({
      data: {
        tournamentId,
        playerId,
      },
    });
    if (!result) {
      throw new Error('Failed to enrol player');
    }
    return {
      tournament,
      player,
    };
  }

  async unenrolPlayer(tournamentId: number, playerId: number) {
    const result = await this.prisma.tournamentPlayer.deleteMany({
      where: {
        tournamentId,
        playerId,
      },
    });
    return !!result;
  }

  /**
   * enrol a new player to a tournament
   * @param tournamentId tournament id
   * @param playerForm player form
   */
  async enrolNewPlayer(
    tournamentId: number,
    playerForm: CreatePlayerPayload
  ): Promise<EnrolPlayerResponse> {
    const player = await this.prisma.player.create({
      data: {
        name: playerForm.name,
      },
    });
    if (!player) {
      throw new Error('Failed to create player');
    }
    return this.enrolPlayer(tournamentId, player.id);
  }

  /**
   * get all players in a tournament
   * @param tournamentId tournament id
   * @returns a list of players in the tournament
   */
  async getPlayers(tournamentId: number): Promise<IPlayer[]> {
    const results = await this.prisma.tournamentPlayer.findMany({
      where: {
        tournamentId,
      },
    });
    const players = await Promise.all(
      results.map((r) =>
        this.prisma.player.findFirst({
          where: {
            id: r.playerId,
          },
        })
      )
    );
    return players;
  }

  /**
   * get all teams in a tournament
   * @param tournamentId tournament id
   * @returns a list of teams in the tournament
   */
  async getTeams(tournamentId: number): Promise<TournamentTeams> {
    const tournament = await this.prisma.tournament.findFirst({
      where: {
        id: tournamentId,
      },
    });
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    const teams = await this.prisma.tournamentTeam.findMany({
      where: {
        tournamentId,
      },
      include: {
        player1: true,
        player2: true,
      },
    });
    const tournamentTeams: TournamentTeams['teams'] = teams.map((team) => {
      return {
        id: team.id,
        player1: team.player1,
        player2: team.player2,
      };
    });
    return {
      tournament,
      teams: tournamentTeams,
    };
  }

  /**
   * create a team with two players in a tournament
   * @param tournamentId tournament id
   * @param player1Id player 1 id
   * @param player2Id player 2 id
   * @returns created team
   */
  async createTeam(
    tournamentId: number,
    player1Id: number,
    player2Id: number
  ): Promise<TournamentTeam> {
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
      throw new Error('Player cannot team up with himself');
    }
    const existingTeams = await this.prisma.tournamentTeam.findMany({
      where: {
        tournamentId,
      },
    });
    if (
      existingTeams.some(
        (team) => team.player1Id === player1Id || team.player2Id === player2Id
      )
    ) {
      throw new Error('Player already in a team');
    }
    const team = await this.prisma.tournamentTeam.create({
      data: {
        player1Id,
        player2Id,
        tournamentId,
      },
      include: {
        player1: true,
        player2: true,
        tournament: true,
      },
    });
    return {
      id: team.id,
      player1: team.player1,
      player2: team.player2,
      tournament: team.tournament,
    };
  }

  /**
   * get paried matches for the next round
   * @param tournamentId tournament id
   */
  // async nextRound(
  //   tournamentId: number
  // ): Promise<ISingleMatch[] | IDoubleMatch[]> {
  //   throw new Error('Not implemented');
  // }
}
