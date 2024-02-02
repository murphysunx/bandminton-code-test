import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoundModule } from '../round/round.module';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { MatchModule } from '../match/match.module';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
  imports: [PrismaModule, RoundModule, MatchModule],
})
export class TournamentModule {}
