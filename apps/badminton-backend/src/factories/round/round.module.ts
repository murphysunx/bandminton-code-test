import { Module } from '@nestjs/common';
import { RoundFactory } from './round.factory';

@Module({
  providers: [RoundFactory],
  exports: [RoundFactory],
  imports: [],
})
export class RoundFactoryModule {}
