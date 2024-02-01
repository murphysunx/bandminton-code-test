import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MatchService } from './match.service';

@Module({
  controllers: [],
  providers: [MatchService],
  imports: [PrismaModule],
  exports: [MatchService],
})
export class MatchModule {}
