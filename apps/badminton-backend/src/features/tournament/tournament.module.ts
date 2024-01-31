import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
  imports: [PrismaModule],
})
export class TournamentModule {}
