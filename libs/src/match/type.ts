import { Match } from '@prisma/client';

export type CreateSingleMatchPayload = Pick<
  Match,
  'roundId' | 'player1Id' | 'player2Id'
>;

export type CreateDoubleMatchPayload = Pick<
  Match,
  'roundId' | 'team1Id' | 'team2Id'
>;
