import { Player } from '@libs/player/entity';
import { Tournament } from '@libs/tournament/entity';

export interface TeamEnrolmentRepoCreate {
  tournament: Tournament;
  player1: Player;
  player2: Player;
}

export interface TeamEnrolmentRepoQuery {
  tournamentId: number;
}
