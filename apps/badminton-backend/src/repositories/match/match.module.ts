import { Module } from '@nestjs/common';
import { MatchFactoryModule } from '../../factories/match/match.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerEnrolmentRepositoryModule } from '../player-enrolment/player-enrolment.module';
import { PlayerRepositoryModule } from '../player/player.module';
import { TeamEnrolmentRepositoryModle } from '../team-enrolment/team-enrolment.module';
import { MatchRepository } from './match.repository';

@Module({
  providers: [MatchRepository],
  exports: [MatchRepository],
  imports: [
    PlayerRepositoryModule,
    TeamEnrolmentRepositoryModle,
    PlayerEnrolmentRepositoryModule,
    PrismaModule,
    MatchFactoryModule,
  ],
})
export class MatchRepositoryModule {}
