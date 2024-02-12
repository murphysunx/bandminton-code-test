import { TournamentState } from '@libs/tournament/entity';

export interface TournamentRepoCreate {
  name: string;
}

export interface TournamentRepoQuery {
  state: TournamentState;
}
