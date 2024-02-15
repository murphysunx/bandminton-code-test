import { Module } from '@nestjs/common';
import { PlayerUseCasesModule } from '../../use-cases/player/player.module';
import { PlayerController } from './player.controller';

@Module({
  controllers: [PlayerController],
  providers: [],
  imports: [PlayerUseCasesModule],
})
export class PlayerModule {}
