import { TournamentState } from '@libs/tournament/entity';

export interface TournamentRepoQuery {
  state: TournamentState;
}
