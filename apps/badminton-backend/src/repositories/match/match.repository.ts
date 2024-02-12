import { Match, MatchUnit } from '@libs/match/entity';
import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { Match as MatchModel } from '@prisma/client';
import { MatchFactoryService } from '../../factories/match/match.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepoCreate, PlayerRepoQuery } from '../player/player.interface';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from '../team-enrolment/team-enrolment.interface';
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
    private readonly factory: MatchFactoryService,
    private readonly playerRepo: GenericRepository<
      Player,
      PlayerRepoCreate,
      PlayerRepoQuery
    >,
    private readonly teamRepo: GenericRepository<
      TeamEnrolment,
      TeamEnrolmentRepoCreate,
      TeamEnrolmentRepoQuery
    >
  ) {}

  async getAll(): Promise<Match<MatchUnit>[]> {
    const models = await this.prisma.match.findMany();
    return Promise.all(models.map((model) => this.createFullMatch(model)));
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
    return this.createFullMatch(model);
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
    return this.factory.create(
      model.id,
      model.roundId,
      { unit: unit1 },
      { unit: unit2 },
      model.matchType,
      model.state
    );
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
          player1Id: item.player1.id,
          player2Id: item.player2.id,
          player1Score: item.score[0],
          player2Score: item.score[1],
        },
      });
    } else {
      await this.prisma.match.update({
        where: {
          id,
        },
        data: {
          team1Id: item.player1.id,
          team2Id: item.player2.id,
          player1Score: item.score[0],
          player2Score: item.score[1],
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
    return Promise.all(models.map((model) => this.createFullMatch(model)));
  }

  private async createFullMatch(model: MatchModel): Promise<Match<MatchUnit>> {
    const unit1 =
      model.matchType === 'SINGLE'
        ? await this.playerRepo.getById(model.player1Id!)
        : await this.teamRepo.getById(model.team1Id!);
    const unit2 =
      model.matchType === 'SINGLE'
        ? await this.playerRepo.getById(model.player2Id!)
        : await this.teamRepo.getById(model.team2Id!);
    return this.factory.create(
      model.id,
      model.roundId,
      { unit: unit1 },
      { unit: unit2 },
      model.matchType,
      model.state
    );
  }
}
