import { Module } from '@nestjs/common';
import { BasicRankTool } from '../../core/rank-tool';
import { RankToolAbstract } from '../../core/rank-tool/type';
import { BFSRoundCalculator } from '../../core/round-calculator';
import { RoundCalculatorAbstract } from '../../core/round-calculator/type';
import { PlayerEnrolmentRepositoryModule } from '../../repositories/player-enrolment/player-enrolment.module';
import { TeamEnrolmentRepositoryModle } from '../../repositories/team-enrolment/team-enrolment.module';
import { TournamentRepositoryModule } from '../../repositories/tournament/tournament.module';
import { PlayerUseCasesModule } from '../player/player.module';
import { RoundUseCasesModule } from '../round/round.module';
import { TournamentUseCases } from './tournament.use-case';

@Module({
  providers: [
    TournamentUseCases,
    {
      provide: RankToolAbstract,
      useValue: new BasicRankTool(),
    },
    {
      provide: RoundCalculatorAbstract,
      inject: [RankToolAbstract],
      useFactory: (rankTool: RankToolAbstract) =>
        new BFSRoundCalculator(10, rankTool),
    },
  ],
  exports: [TournamentUseCases],
  imports: [
    TournamentRepositoryModule,
    PlayerUseCasesModule,
    PlayerEnrolmentRepositoryModule,
    TeamEnrolmentRepositoryModle,
    RoundUseCasesModule,
  ],
})
export class TournamentUseCasesModule {}
