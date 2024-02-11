import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MatchModule } from '../match/match.module';
import { RoundModule } from '../round/round.module';
import { TournamentController } from './tournament.controller';
import { TournamentRepository } from './tournament.repository';
import { TournamentService } from './tournament.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, TournamentRepository],
  imports: [PrismaModule, RoundModule, MatchModule],
})
export class TournamentModule {}
