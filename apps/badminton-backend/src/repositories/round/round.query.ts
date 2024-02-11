import { Round as RoundModel } from '@prisma/client';

export interface RoundRepoQuery {
  tournamentId?: number;
  matchType?: RoundModel['matchType'];
}
