import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { Tournament as TournamentModel } from '@prisma/client';
import { CreateTournamentDto } from '../../core/dtos/tournament.dto';
import { TournamentFactoryService } from '../../factories/tournament/tournament.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import {
  PlayerEnrolmentRepoCreate,
  PlayerEnrolmentRepoQuery,
} from '../player-enrolment/player-enrolment.interface';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from '../team-enrolment/team-enrolment.interface';
import {
  TournamentRepoCreate,
  TournamentRepoQuery,
} from './tournament.interface';

@Injectable()
export class TournamentRepository
  implements
    GenericRepository<Tournament, TournamentRepoCreate, TournamentRepoQuery>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tournamentFactory: TournamentFactoryService,
    private readonly playerEnrolmentRepository: GenericRepository<
      PlayerEnrolment,
      PlayerEnrolmentRepoCreate,
      PlayerEnrolmentRepoQuery
    >,
    private readonly teamEnrolmentRepository: GenericRepository<
      TeamEnrolment,
      TeamEnrolmentRepoCreate,
      TeamEnrolmentRepoQuery
    >
  ) {}

  async create(item: CreateTournamentDto) {
    const tournament = await this.prismaService.tournament.create({
      data: {
        ...item,
      },
    });
    return this.tournamentFactory.create(tournament);
  }

  async getAll() {
    const models = await this.prismaService.tournament.findMany();
    const tournaments = await Promise.all(
      models.map(async (t) => await this.createFullTournament(t))
    );
    return tournaments;
  }

  async getById(id: number) {
    const t = await this.prismaService.tournament.findUnique({
      where: {
        id,
      },
    });
    if (!t) {
      throw new Error('Tournament not found');
    }
    const tournament = await this.createFullTournament(t);
    return tournament;
  }

  async update(id: number, tournament: Tournament) {
    const t = await this.prismaService.tournament.update({
      data: {
        name: tournament.name,
      },
      where: {
        id,
      },
    });
    return this.tournamentFactory.create(t);
  }

  async search(query: TournamentRepoQuery): Promise<Tournament[]> {
    const models = await this.prismaService.tournament.findMany({
      where: {
        state: query.state,
      },
    });
    const tournaments = await Promise.all(
      models.map(async (t) => await this.createFullTournament(t))
    );
    return tournaments;
  }

  private async createFullTournament(model: TournamentModel) {
    const tournament = await this.tournamentFactory.create(model);
    // add players
    const playerEnrolments = await this.playerEnrolmentRepository.search({
      tournamentId: tournament.id,
    });
    tournament.enrolPlayers(playerEnrolments.map((e) => e.player));
    // add teams
    const teamEnrolments = await this.teamEnrolmentRepository.search({
      tournamentId: tournament.id,
    });
    tournament.enrolTeams(teamEnrolments);
    return tournament;
  }
}
