import { Tournament } from '@libs/tournament/entity';
import { Round as RoundModel } from '@prisma/client';

export interface RoundRepoCreate {
  tournament: Tournament;
  type: 'SINGLE' | 'DOUBLE';
}

export interface RoundRepoQuery {
  tournamentId?: number;
  matchType?: RoundModel['matchType'];
}
