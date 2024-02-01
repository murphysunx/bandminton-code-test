import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamService } from './team.service';

@Module({
  controllers: [],
  providers: [TeamService],
  imports: [PrismaModule],
})
export class TeamModule {}
