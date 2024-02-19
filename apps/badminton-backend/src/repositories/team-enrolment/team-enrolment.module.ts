import { Module } from '@nestjs/common';
import { TeamEnrolmentFactoryModule } from '../../factories/team-enrolment/team-enrolment.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamEnrolmentRepository } from './team-enrolment.repository';

@Module({
  providers: [TeamEnrolmentRepository],
  exports: [TeamEnrolmentRepository],
  imports: [PrismaModule, TeamEnrolmentFactoryModule],
})
export class TeamEnrolmentRepositoryModle {}
