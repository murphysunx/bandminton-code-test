import { Module } from '@nestjs/common';
import { TournamentFactoryService } from './tournament.factory';

@Module({
  providers: [TournamentFactoryService],
  exports: [TournamentFactoryService],
  imports: [],
})
export class TournamentFactoryModule {}
