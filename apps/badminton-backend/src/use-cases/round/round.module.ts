import { Module } from '@nestjs/common';
import { MatchRepositoryModule } from '../../repositories/match/match.module';
import { RoundRepositoryModule } from '../../repositories/round/round.module';
import { RoundUseCases } from './round.use-case';

@Module({
  providers: [RoundUseCases],
  exports: [RoundUseCases],
  imports: [RoundRepositoryModule, MatchRepositoryModule],
})
export class RoundUseCasesModule {}
