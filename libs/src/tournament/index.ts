import { IPlayer } from '../player/index';

export interface ITournament {
  id: number;
  name: string;
}

export type CreateTournamentPayload = {
  name: string;
};

export type EnrolPlayerResponse = {
  tournament: ITournament;
  player: IPlayer;
};
