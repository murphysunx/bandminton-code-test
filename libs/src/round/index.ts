import { IDoubleMatch, ISingleMatch } from '../match/index';

export type RoundMatch = [number, number];

export type TournamentRound<T extends ISingleMatch | IDoubleMatch> = {
  id: number;
  matches: T[];
};
