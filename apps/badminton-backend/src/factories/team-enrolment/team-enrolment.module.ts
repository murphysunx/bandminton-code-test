import { Module } from '@nestjs/common';
import { TeamEnrolmentFactory } from './team-enrolment.factory';

@Module({
  providers: [TeamEnrolmentFactory],
  exports: [TeamEnrolmentFactory],
  imports: [],
})
export class TeamEnrolmentFactoryModule {}
