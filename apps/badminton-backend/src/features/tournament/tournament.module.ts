import { Module } from '@nestjs/common';
import { TournamentUseCasesModule } from '../../use-cases/tournament/tournament.module';
import { TournamentController } from './tournament.controller';

@Module({
  controllers: [TournamentController],
  providers: [],
  imports: [TournamentUseCasesModule],
})
export class TournamentModule {}
