import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { TeamEnrolmentFactory } from '../../factories/team-enrolment/team-enrolment.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepoCreate, PlayerRepoQuery } from '../player/player.interface';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from './team-enrolment.interface';

@Injectable()
export class TeamEnrolmentRepository
  implements
    GenericRepository<
      TeamEnrolment,
      TeamEnrolmentRepoCreate,
      TeamEnrolmentRepoQuery
    >
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly teamEnrolmentFactory: TeamEnrolmentFactory,
    private readonly playerRepository: GenericRepository<
      Player,
      PlayerRepoCreate,
      PlayerRepoQuery
    >
  ) {}

  async getAll(): Promise<TeamEnrolment[]> {
    const models = await this.prismaService.teamEnrolment.findMany();
    const teamEnrolments = await Promise.all(
      models.map(async (m) => {
        const player1 = await this.playerRepository.getById(m.player1Id);
        const player2 = await this.playerRepository.getById(m.player2Id);
        return this.teamEnrolmentFactory.create(
          m.id,
          m.tournamentId,
          player1,
          player2
        );
      })
    );
    return teamEnrolments;
  }

  async getById(id: number): Promise<TeamEnrolment> {
    const model = await this.prismaService.teamEnrolment.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Team enrolment with id ${id} not found`);
    }
    const player1 = await this.playerRepository.getById(model.player1Id);
    const player2 = await this.playerRepository.getById(model.player2Id);
    return this.teamEnrolmentFactory.create(
      model.id,
      model.tournamentId,
      player1,
      player2
    );
  }

  async create({
    player1,
    player2,
    tournament,
  }: TeamEnrolmentRepoCreate): Promise<TeamEnrolment> {
    const enrolment = await this.prismaService.teamEnrolment.create({
      data: {
        player1Id: player1.id,
        player2Id: player2.id,
        tournamentId: tournament.id,
      },
    });
    return this.teamEnrolmentFactory.create(
      enrolment.id,
      tournament.id,
      player1,
      player2
    );
  }

  async update(id: number, updated: TeamEnrolment): Promise<TeamEnrolment> {
    const model = await this.prismaService.teamEnrolment.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Team enrolment with id ${id} not found`);
    }
    await this.prismaService.teamEnrolment.update({
      where: {
        id,
      },
      data: {
        tournamentId: updated.tournamentId,
        player1Id: updated.player1.id,
        player2Id: updated.player2.id,
      },
    });
    return updated;
  }

  async search(query: TeamEnrolmentRepoQuery): Promise<TeamEnrolment[]> {
    const models = await this.prismaService.teamEnrolment.findMany({
      where: {
        tournamentId: query.tournamentId,
      },
    });
    const teamEnrolments = await Promise.all(
      models.map(async (m) => {
        const player1 = await this.playerRepository.getById(m.player1Id);
        const player2 = await this.playerRepository.getById(m.player2Id);
        return this.teamEnrolmentFactory.create(
          m.id,
          m.tournamentId,
          player1,
          player2
        );
      })
    );
    return teamEnrolments;
  }
}
