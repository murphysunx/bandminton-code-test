import { Module } from '@nestjs/common';
import { TournamentFactoryModule } from '../../factories/tournament/tournament.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { TournamentRepository } from './tournament.repository';

@Module({
  imports: [PrismaModule, TournamentFactoryModule],
  providers: [TournamentRepository],
  exports: [TournamentRepository],
})
export class TournamentRepositoryModule {}
