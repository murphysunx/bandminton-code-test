import { Module } from '@nestjs/common';
import { PlayerFactoryModule } from '../../factories/player/player.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerRepository } from './player.repository';

@Module({
  providers: [PlayerRepository],
  exports: [PlayerRepository],
  imports: [PrismaModule, PlayerFactoryModule],
})
export class PlayerRepositoryModule {}
