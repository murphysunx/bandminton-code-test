import { Module } from '@nestjs/common';
import { PlayerEnrolmentFactoryService } from './player-enrolment.factory';

@Module({
  providers: [PlayerEnrolmentFactoryService],
  exports: [PlayerEnrolmentFactoryService],
  imports: [],
})
export class PlayerEnrolmentFactoryModule {}
