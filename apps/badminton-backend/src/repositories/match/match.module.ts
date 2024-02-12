import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Module } from '@nestjs/common';
import { MatchFactoryModule } from '../../factories/match/match.module';
import { TeamEnrolmentFactoryModule } from '../../factories/team-enrolment/team-enrolment.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepositoryModule } from '../player/player.module';
import { PlayerRepoCreate, PlayerRepoQuery } from '../player/player.interface';
import { PlayerRepository } from '../player/player.repository';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from '../team-enrolment/team-enrolment.interface';
import { TeamEnrolmentRepository } from '../team-enrolment/team-enrolment.repository';
import { MatchRepository } from './match.repository';

@Module({
  providers: [
    MatchRepository,
    {
      provide: GenericRepository<Player, PlayerRepoCreate, PlayerRepoQuery>,
      useClass: PlayerRepository,
    },
    {
      provide: GenericRepository<
        TeamEnrolment,
        TeamEnrolmentRepoCreate,
        TeamEnrolmentRepoQuery
      >,
      useClass: TeamEnrolmentRepository,
    },
  ],
  exports: [MatchRepository],
  imports: [
    PlayerRepositoryModule,
    TeamEnrolmentFactoryModule,
    PrismaModule,
    MatchFactoryModule,
  ],
})
export class MatchRepositoryModule {}
