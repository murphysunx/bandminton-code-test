import { Match, MatchUnit } from '@libs/match/entity';
import { Round } from '@libs/round/entity';
import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { MatchRepository } from '../../repositories/match/match.repository';
import { RoundRepository } from '../../repositories/round/round.repository';

@Injectable()
export class RoundUseCases {
  constructor(
    private readonly roundRepo: RoundRepository,
    private readonly matchRepo: MatchRepository
  ) {}

  async createRoundWithMatches<U extends MatchUnit>(
    tournament: Tournament,
    matchType: 'SINGLE' | 'DOUBLE',
    matches: [U, U][]
  ): Promise<Round<U>> {
    const round = (await this.roundRepo.create({
      tournament,
      type: matchType,
    })) as Round<U>;
    for (const match of matches) {
      const createdMatch = (await this.matchRepo.create({
        round,
        unit1: match[0],
        unit2: match[1],
      })) as Match<U>;
      round.addMatch(createdMatch);
    }
    return round;
  }
}
