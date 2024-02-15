import { Module } from '@nestjs/common';
import { TournamentFactoryModule } from '../../factories/tournament/tournament.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerEnrolmentRepositoryModule } from '../player-enrolment/player-enrolment.module';
import { TeamEnrolmentRepositoryModle } from '../team-enrolment/team-enrolment.module';
import { TournamentRepository } from './tournament.repository';

@Module({
  imports: [
    PrismaModule,
    TournamentFactoryModule,
    PlayerEnrolmentRepositoryModule,
    TeamEnrolmentRepositoryModle,
  ],
  providers: [TournamentRepository],
  exports: [TournamentRepository],
})
export class TournamentRepositoryModule {}
