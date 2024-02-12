import { Player } from '@libs/player/entity';
import { Module } from '@nestjs/common';
import { TeamEnrolmentFactoryModule } from '../../factories/team-enrolment/team-enrolment.module';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../generic-repo.abstract';
import { PlayerRepositoryModule } from '../player/player.module';
import { PlayerRepoCreate, PlayerRepoQuery } from '../player/player.interface';
import { PlayerRepository } from '../player/player.repository';
import { TeamEnrolmentRepository } from './team-enrolment.repository';

@Module({
  providers: [
    TeamEnrolmentRepository,
    {
      provide: GenericRepository<Player, PlayerRepoCreate, PlayerRepoQuery>,
      useClass: PlayerRepository,
    },
  ],
  exports: [TeamEnrolmentRepository],
  imports: [PrismaService, TeamEnrolmentFactoryModule, PlayerRepositoryModule],
})
export class TeamEnrolmentRepositoryModle {}
