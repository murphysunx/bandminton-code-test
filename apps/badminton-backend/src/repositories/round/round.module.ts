import { Module } from '@nestjs/common';
import { RoundFactoryModule } from '../../factories/round/round.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoundRepository } from './round.repository';

@Module({
  providers: [RoundRepository],
  exports: [RoundRepository],
  imports: [PrismaModule, RoundFactoryModule],
})
export class RoundRepositoryModule {}
