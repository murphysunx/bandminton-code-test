import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { PlayerEnrolmentFactoryService } from '../../factories/player-enrolment/player-enrolment.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import {
  PlayerEnrolmentRepoCreate,
  PlayerEnrolmentRepoQuery,
} from './player-enrolment.interface';

@Injectable()
export class PlayerEnrolmentRepository
  implements
    GenericRepository<
      PlayerEnrolment,
      PlayerEnrolmentRepoCreate,
      PlayerEnrolmentRepoQuery
    >
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly enrolmentFactory: PlayerEnrolmentFactoryService
  ) {}

  async create({
    player,
    tournament,
  }: PlayerEnrolmentRepoCreate): Promise<PlayerEnrolment> {
    const enrolment = await this.prisma.playerEnrolment.create({
      data: {
        playerId: player.id,
        tournamentId: tournament.id,
      },
    });
    return this.enrolmentFactory.create(enrolment);
  }

  async getAll(): Promise<PlayerEnrolment[]> {
    const enrolmentModels = await this.prisma.playerEnrolment.findMany();
    const enrolments = await Promise.all(
      enrolmentModels.map(async (e) => {
        return this.enrolmentFactory.create(e);
      })
    );
    return enrolments;
  }

  async getById(id: number): Promise<PlayerEnrolment> {
    const enrolment = await this.prisma.playerEnrolment.findUnique({
      where: {
        id,
      },
    });
    if (!enrolment) {
      throw new Error('Enrolment not found');
    }
    return this.enrolmentFactory.create(enrolment);
  }

  async update(id: number, item: PlayerEnrolment): Promise<PlayerEnrolment> {
    const enrolment = await this.prisma.playerEnrolment.findUnique({
      where: {
        id,
      },
    });
    if (!enrolment) {
      throw new Error('Enrolment not found');
    }
    await this.prisma.playerEnrolment.update({
      data: {
        playerId: item.playerId,
        tournamentId: item.tournamentId,
      },
      where: {
        id,
      },
    });
    return item;
  }

  async search(query: PlayerEnrolmentRepoQuery): Promise<PlayerEnrolment[]> {
    const enrolmentModels = await this.prisma.playerEnrolment.findMany({
      where: {
        tournamentId: query.tournamentId,
        playerId: query.playerId,
      },
    });
    const enrolments = await Promise.all(
      enrolmentModels.map(async (e) => {
        return this.enrolmentFactory.create(e);
      })
    );
    return enrolments;
  }
}
