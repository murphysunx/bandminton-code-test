import { Player } from '@libs/player/entity';
import { Tournament } from '@libs/tournament/entity';

export interface PlayerEnrolmentRepoCreate {
  tournament: Tournament;
  player: Player;
}

export interface PlayerEnrolmentRepoQuery {
  tournamentId?: number;
  playerId?: number;
}
