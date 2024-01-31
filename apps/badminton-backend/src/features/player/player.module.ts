import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [PrismaModule],
})
export class PlayerModule {}
