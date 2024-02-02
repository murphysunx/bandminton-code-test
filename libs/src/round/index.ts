import { RankedPlayer, RankedTeam } from '../player/index';
import { IDoubleMatch, ISingleMatch } from '../match/index';

import { RoundState as RS } from 'prisma/prisma-client';

export type RoundMatch = [number, number];

export type RoundState = RS;

export type TournamentSingleRound = {
  id: number;
  index: number;
  matches: ISingleMatch[];
  state: RoundState;
  rank: RankedPlayer[];
};

export type TournamentDoubleRound = {
  id: number;
  index: number;
  matches: IDoubleMatch[];
  state: RoundState;
  rank: RankedTeam[];
};
