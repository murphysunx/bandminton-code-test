import { Player } from '@libs/player/entity';
import { Module } from '@nestjs/common';
import { PlayerEnrolmentFactoryModule } from '../../factories/player-enrolment/player-enrolment.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepositoryModule } from '../player/player.module';
import { PlayerRepoCreate, PlayerRepoQuery } from '../player/player.interface';
import { PlayerRepository } from '../player/player.repository';
import { PlayerEnrolmentRepository } from './player-enrolment.repository';

@Module({
  providers: [
    PlayerEnrolmentRepository,
    {
      provide: GenericRepository<Player, PlayerRepoCreate, PlayerRepoQuery>,
      useClass: PlayerRepository,
    },
  ],
  exports: [PlayerEnrolmentRepository],
  imports: [PrismaModule, PlayerEnrolmentFactoryModule, PlayerRepositoryModule],
})
export class PlayerEnrolmentRepositoryModule {}
