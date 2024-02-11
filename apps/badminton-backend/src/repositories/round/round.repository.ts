import { Match, MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';
import { Injectable } from '@nestjs/common';
import { Round as RoundModel } from '@prisma/client';
import { RoundFactory } from '../../factories/round/round.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { MatchRepoQuery } from '../match/match.query';
import { RoundRepoQuery } from './round.query';

@Injectable()
export class RoundRepository
  implements GenericRepository<Round<MatchUnit>, RoundRepoQuery>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roundFactory: RoundFactory,
    private readonly matchRepository: GenericRepository<
      Match<MatchUnit>,
      MatchRepoQuery
    >
  ) {}

  async getAll(): Promise<Round<MatchUnit>[]> {
    const models = await this.prismaService.round.findMany();
    const rounds = await Promise.all(
      models.map(async (model) => {
        return await this.createFullRound(model);
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
    return this.createFullRound(model);
  }

  async create(
    tournamentId: number,
    type: RoundModel['matchType']
  ): Promise<Round<MatchUnit>> {
    const exisitingRounds = await this.prismaService.round.findMany({
      where: {
        tournamentId,
        matchType: type,
      },
    });
    const model = await this.prismaService.round.create({
      data: {
        tournamentId,
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
    const rounds = await Promise.all(models.map(this.createFullRound));
    return rounds;
  }

  private async createFullRound(model: RoundModel) {
    const round = this.roundFactory.create(model);
    const matches = await this.matchRepository.search({
      roundId: model.id,
    });
    round.addMatches(matches);
    return round;
  }
}
