import { Match, MatchUnit } from '@libs/match/entity';
import { Module } from '@nestjs/common';
import { RoundFactoryModule } from '../../factories/round/round.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenericRepository } from '../generic-repo.abstract';
import { MatchRepositoryModule } from '../match/match.module';
import { MatchRepoCreate, MatchRepoQuery } from '../match/match.interface';
import { MatchRepository } from '../match/match.repository';
import { RoundRepository } from './round.repository';

@Module({
  providers: [
    RoundRepository,
    {
      provide: GenericRepository<
        Match<MatchUnit>,
        MatchRepoCreate<MatchUnit>,
        MatchRepoQuery
      >,
      useClass: MatchRepository,
    },
  ],
  exports: [RoundRepository],
  imports: [PrismaModule, RoundFactoryModule, MatchRepositoryModule],
})
export class RoundRepositoryModule {}
