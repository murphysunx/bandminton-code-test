import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Player } from '@libs/player/entity';
import { Injectable } from '@nestjs/common';
import { PlayerEnrolmentFactoryService } from '../../factories/player-enrolment/player-enrolment.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepoQuery } from '../player/player.query';
import { PlayerEnrolmentRepoQuery } from './player-enrolment.query';

@Injectable()
export class PlayerEnrolmentRepository
  implements GenericRepository<PlayerEnrolment, PlayerEnrolmentRepoQuery>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly playerRepository: GenericRepository<
      Player,
      PlayerRepoQuery
    >,
    private readonly enrolmentFactory: PlayerEnrolmentFactoryService
  ) {}

  async create(
    playerId: number,
    tournamentId: number
  ): Promise<PlayerEnrolment> {
    const enrolment = await this.prisma.playerEnrolment.create({
      data: {
        playerId,
        tournamentId,
      },
    });
    const player = await this.playerRepository.getById(playerId);
    return this.enrolmentFactory.create(
      enrolment.id,
      enrolment.tournamentId,
      player
    );
  }

  async getAll(): Promise<PlayerEnrolment[]> {
    const enrolmentModels = await this.prisma.playerEnrolment.findMany();
    const enrolments = await Promise.all(
      enrolmentModels.map(async (e) => {
        const player = await this.playerRepository.getById(e.playerId);
        return this.enrolmentFactory.create(e.id, e.tournamentId, player);
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
    const player = await this.playerRepository.getById(enrolment.playerId);
    return this.enrolmentFactory.create(
      enrolment.id,
      enrolment.tournamentId,
      player
    );
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
        playerId: item.player.id,
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
        const player = await this.playerRepository.getById(e.playerId);
        return this.enrolmentFactory.create(e.id, e.tournamentId, player);
      })
    );
    return enrolments;
  }
}
