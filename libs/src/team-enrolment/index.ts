import { IPlayer } from '../player/type';
import { ITournament } from '../tournament/type';

export type CreateTeamPayload = {
  player1Id: number;
  player2Id: number;
};

export type TournamentTeam = {
  id: number;
  tournament: ITournament;
  player1: IPlayer;
  player2: IPlayer;
};

export type Team = Omit<TournamentTeam, 'tournament'>;

export type Teams = Team[];