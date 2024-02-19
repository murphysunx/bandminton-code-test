import { MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';
import { Injectable } from '@nestjs/common';
import { RoundFactory } from '../../factories/round/round.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { RoundRepoCreate, RoundRepoQuery } from './round.interface';

@Injectable()
export class RoundRepository
  implements
    GenericRepository<Round<MatchUnit>, RoundRepoCreate, RoundRepoQuery>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roundFactory: RoundFactory
  ) {}

  async getAll(): Promise<Round<MatchUnit>[]> {
    const models = await this.prismaService.round.findMany();
    const rounds = await Promise.all(
      models.map(async (model) => {
        return await this.roundFactory.create(model);
      })
    );
    return rounds;
  }

  async getById(id: number): Promise<Round<MatchUnit>> {
    const model = await this.prismaService.round.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Round with id ${id} not found`);
    }
    return this.roundFactory.create(model);
  }

  async create({
    tournament,
    type,
  }: RoundRepoCreate): Promise<Round<MatchUnit>> {
    const exisitingRounds = await this.prismaService.round.findMany({
      where: {
        tournamentId: tournament.id,
        matchType: type,
      },
    });
    const model = await this.prismaService.round.create({
      data: {
        tournamentId: tournament.id,
        matchType: type,
        index: exisitingRounds.length + 1,
      },
    });
    return this.roundFactory.create(model);
  }

  async update(id: number, item: Round<MatchUnit>): Promise<Round<MatchUnit>> {
    const model = await this.prismaService.round.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Round with id ${id} not found`);
    }
    await this.prismaService.round.update({
      where: {
        id,
      },
      data: {
        state: item.state,
      },
    });
    return item;
  }

  async search(query: RoundRepoQuery): Promise<Round<MatchUnit>[]> {
    const models = await this.prismaService.round.findMany({
      where: {
        tournamentId: query.tournamentId,
        matchType: query.matchType,
      },
    });
    const rounds = await Promise.all(
      models.map((model) => this.roundFactory.create(model))
    );
    return rounds;
  }
}
