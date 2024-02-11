import { Module } from '@nestjs/common';
import { PlayerEnrolmentRepositoryModule } from '../../repositories/player-enrolment/player-enrolment.module';
import { TournamentRepositoryModule } from '../../repositories/tournament/tournament.module';
import { TournamentUseCases } from './tournament.use-case';

@Module({
  providers: [TournamentUseCases],
  exports: [],
  imports: [TournamentRepositoryModule, PlayerEnrolmentRepositoryModule],
})
export class TournamentUseCasesModule {}
