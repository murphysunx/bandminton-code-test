import { Module } from '@nestjs/common';
import { MatchRepositoryService } from './match.repository';

@Module({
  providers: [MatchRepositoryService],
  exports: [MatchRepositoryService],
  imports: [],
})
export class MatchRepositoryModule {}
