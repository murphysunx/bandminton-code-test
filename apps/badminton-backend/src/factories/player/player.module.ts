import { Module } from '@nestjs/common';
import { PlayerFactory } from './player.factory';

@Module({
  providers: [PlayerFactory],
  exports: [PlayerFactory],
  imports: [],
})
export class PlayerFactoryModule {}
