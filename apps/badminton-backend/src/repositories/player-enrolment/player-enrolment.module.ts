import { Module } from '@nestjs/common';
import { PlayerEnrolmentFactoryModule } from '../../factories/player-enrolment/player-enrolment.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerEnrolmentRepository } from './player-enrolment.repository';

@Module({
  providers: [PlayerEnrolmentRepository],
  exports: [PlayerEnrolmentRepository],
  imports: [PrismaModule, PlayerEnrolmentFactoryModule],
})
export class PlayerEnrolmentRepositoryModule {}
