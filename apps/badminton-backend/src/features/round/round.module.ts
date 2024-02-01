import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoundService } from './round.service';
import { MatchModule } from '../match/match.module';

@Module({
  controllers: [],
  providers: [RoundService],
  exports: [RoundService],
  imports: [PrismaModule, MatchModule],
})
export class RoundModule {}
