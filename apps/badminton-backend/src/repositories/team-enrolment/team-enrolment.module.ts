import { Player } from '@libs/player/entity';
import { Module } from '@nestjs/common';
import { TeamEnrolmentFactoryModule } from '../../factories/team-enrolment/team-enrolment.module';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepoQuery } from '../player/player.query';
import { PlayerRepository } from '../player/player.repository';
import { TeamEnrolmentRepository } from './team-enrolment.repository';

@Module({
  providers: [
    TeamEnrolmentRepository,
    {
      provide: GenericRepository<Player, PlayerRepoQuery>,
      useClass: PlayerRepository,
    },
  ],
  exports: [TeamEnrolmentRepository],
  imports: [PrismaService, TeamEnrolmentFactoryModule, PlayerRepository],
})
export class TeamEnrolmentRepositoryModle {}
