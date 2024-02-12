import { Player } from '@libs/player/entity';
import { Injectable } from '@nestjs/common';
import { PlayerFactory } from '../../factories/player/player.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepoCreate, PlayerRepoQuery } from './player.interface';

@Injectable()
export class PlayerRepository
  implements GenericRepository<Player, PlayerRepoCreate, PlayerRepoQuery>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: PlayerFactory
  ) {}

  async getById(id: number): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: {
        id,
      },
    });
    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }
    return this.factory.createFromModel(player);
  }

  async create({ name }: PlayerRepoCreate) {
    const player = await this.prisma.player.create({
      data: {
        name,
      },
    });
    return this.factory.createFromModel(player);
  }

  async getAll() {
    const players = await this.prisma.player.findMany();
    return players.map((player) => this.factory.createFromModel(player));
  }

  async update(id: number, updated: Player): Promise<Player> {
    await this.prisma.player.update({
      data: {
        name: updated.name,
      },
      where: {
        id,
      },
    });
    return updated;
  }

  async search(query: PlayerRepoQuery): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: {
        name: query.name,
      },
    });
    return players.map((player) => this.factory.createFromModel(player));
  }
}
