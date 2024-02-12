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
    if (this.#players.find((p) => p.id === player.id)) {
      throw new Error('Player already enrolled');
    }
    this.#players.push(player);
  }

  enrolPlayers(players: Player[]) {
    players.forEach((player) => this.enrolPlayer(player));
  }

  get players() {
    return this.#players;
  }

  /**
   * check if two players can enrol as a team
   * @param player1 player 1
   * @param player2 player 2
   * @returns
   */
  canEnrolTeam(player1: Player, player2: Player) {
    return (
      this.teamPlayers.indexOf(player1) === -1 &&
      this.teamPlayers.indexOf(player2) === -1
    );
  }

  enrolTeam(team: TeamEnrolment) {
    if (this.#teams.find((t) => t.id === team.id)) {
      throw new Error('Team already enrolled');
    }
    if (this.teamPlayers.find((p) => p.id === team.player1.id)) {
      throw new Error('Player 1 already enrolled in another team');
    }
    if (this.teamPlayers.find((p) => p.id === team.player2.id)) {
      throw new Error('Player 2 already enrolled in another team');
    }
    this.#teams.push(team);
  }

  enrolTeams(teams: TeamEnrolment[]) {
    teams.forEach((team) => this.enrolTeam(team));
  }

  get teams() {
    return this.#teams;
  }

  get teamPlayers() {
    return this.#teams.flatMap((team) => [team.player1, team.player2]);
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
