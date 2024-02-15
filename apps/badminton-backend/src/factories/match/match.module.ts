import { Module } from '@nestjs/common';
import { MatchFactoryService } from './match.factory';

@Module({
  providers: [MatchFactoryService],
  exports: [MatchFactoryService],
  imports: [],
})
export class MatchFactoryModule {}
