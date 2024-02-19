import { Module } from '@nestjs/common';
import { MatchFactoryModule } from '../../factories/match/match.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerRepositoryModule } from '../player/player.module';
import { MatchRepository } from './match.repository';

@Module({
  providers: [MatchRepository],
  exports: [MatchRepository],
  imports: [PlayerRepositoryModule, PrismaModule, MatchFactoryModule],
})
export class MatchRepositoryModule {}
