import { Player } from '../player/entity';
import { Round } from '../round/entity';
import { TeamEnrolment } from '../team-enrolment/entity';

export type TournamentState = 'CREATED' | 'STARTED' | 'ENDED';

export class Tournament {
  #players: Player[] = [];
  #teams: TeamEnrolment[] = [];
  #singleRounds: Round<Player>[] = [];
  #doubleRounds: Round<TeamEnrolment>[] = [];

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly state: TournamentState
  ) {}

  enrolPlayer(player: Player) {
    this.#players.push(player);
  }

  enrolPlayers(players: Player[]) {
    this.#players.push(...players);
  }

  get players() {
    return this.#players;
  }

  enrolTeam(team: TeamEnrolment) {
    this.#teams.push(team);
  }

  enrolTeams(teams: TeamEnrolment[]) {
    this.#teams.push(...teams);
  }

  get teams() {
    return this.#teams;
  }

  addSingleRound(round: Round<Player>) {
    const lastRound = this.#singleRounds[this.#singleRounds.length - 1];
    if (lastRound && !lastRound.isFinished) {
      throw new Error(
        'Cannot add a new round until the current round is complete'
      );
    }
    this.#singleRounds.push(round);
  }

  addDoubleRound(round: Round<TeamEnrolment>) {
    const lastRound = this.#doubleRounds[this.#doubleRounds.length - 1];
    if (lastRound && !lastRound.isFinished) {
      throw new Error(
        'Cannot add a new round until the current round is complete'
      );
    }
    this.#doubleRounds.push(round);
  }

  // get isReady
}
