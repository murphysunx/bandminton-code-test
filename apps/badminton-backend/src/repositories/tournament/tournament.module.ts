import { Player } from '@libs/player/entity';
import { Module } from '@nestjs/common';
import { TournamentFactoryModule } from '../../factories/tournament/tournament.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepositoryModule } from '../player/player.module';
import { PlayerRepoQuery } from '../player/player.query';
import { PlayerRepository } from '../player/player.repository';
import { TournamentRepository } from './tournament.repository';

@Module({
  imports: [PrismaModule, TournamentFactoryModule, PlayerRepositoryModule],
  providers: [
    TournamentRepository,
    {
      provide: GenericRepository<Player, PlayerRepoQuery>,
      useClass: PlayerRepository,
    },
  ],
  exports: [TournamentRepository],
})
export class TournamentRepositoryModule {}
