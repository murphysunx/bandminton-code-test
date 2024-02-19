import { Match, MatchUnit } from '@libs/match/entity';
import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { MatchFactoryService } from '../../factories/match/match.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { MatchRepoCreate, MatchRepoQuery } from './match.interface';

@Injectable()
export class MatchRepository
  implements
    GenericRepository<
      Match<MatchUnit>,
      MatchRepoCreate<MatchUnit>,
      MatchRepoQuery
    >
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly factory: MatchFactoryService
  ) {}

  async getAll(): Promise<Match<MatchUnit>[]> {
    const models = await this.prisma.match.findMany();
    return Promise.all(
      models.map((model) => {
        return this.factory.createSimple(model);
      })
    );
  }

  async getById(id: number): Promise<Match<MatchUnit>> {
    const model = await this.prisma.match.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Match with id ${id} not found`);
    }
    return this.factory.createSimple(model);
  }

  async create({
    round,
    unit1,
    unit2,
  }: MatchRepoCreate<MatchUnit>): Promise<Match<MatchUnit>> {
    const model = await this.prisma.match.create({
      data: {
        roundId: round.id,
        player1Id: unit1 instanceof Player ? unit1.id : void 0,
        player2Id: unit2 instanceof Player ? unit2.id : void 0,
        team1Id: unit1 instanceof TeamEnrolment ? unit1.id : void 0,
        team2Id: unit2 instanceof Player ? unit2.id : void 0,
        matchType: unit1 instanceof Player ? 'SINGLE' : 'DOUBLE',
      },
    });
    return this.factory.createSimple(model);
  }

  async update(id: number, item: Match<MatchUnit>): Promise<Match<MatchUnit>> {
    const model = await this.prisma.match.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new Error(`Match with id ${id} not found`);
    }
    if (item.matchType === 'SINGLE') {
      await this.prisma.match.update({
        where: {
          id,
        },
        data: {
          player1Score: item.scores[0],
          player2Score: item.scores[1],
        },
      });
    } else {
      await this.prisma.match.update({
        where: {
          id,
        },
        data: {
          player1Score: item.scores[0],
          player2Score: item.scores[1],
        },
      });
    }
    return item;
  }

  async search(query: MatchRepoQuery): Promise<Match<MatchUnit>[]> {
    const models = await this.prisma.match.findMany({
      where: {
        roundId: query.roundId,
      },
    });
    return Promise.all(models.map((model) => this.factory.createSimple(model)));
  }
}
