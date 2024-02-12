import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Module } from '@nestjs/common';
import { TournamentFactoryModule } from '../../factories/tournament/tournament.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerEnrolmentRepositoryModule } from '../player-enrolment/player-enrolment.module';
import {
  PlayerEnrolmentRepoCreate,
  PlayerEnrolmentRepoQuery,
} from '../player-enrolment/player-enrolment.interface';
import { PlayerEnrolmentRepository } from '../player-enrolment/player-enrolment.repository';
import { TeamEnrolmentRepositoryModle } from '../team-enrolment/team-enrolment.module';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from '../team-enrolment/team-enrolment.interface';
import { TeamEnrolmentRepository } from '../team-enrolment/team-enrolment.repository';
import { TournamentRepository } from './tournament.repository';

@Module({
  imports: [
    PrismaModule,
    TournamentFactoryModule,
    PlayerEnrolmentRepositoryModule,
    TeamEnrolmentRepositoryModle,
  ],
  providers: [
    TournamentRepository,
    {
      provide: GenericRepository<
        PlayerEnrolment,
        PlayerEnrolmentRepoCreate,
        PlayerEnrolmentRepoQuery
      >,
      useClass: PlayerEnrolmentRepository,
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
  exports: [TournamentRepository],
})
export class TournamentRepositoryModule {}
