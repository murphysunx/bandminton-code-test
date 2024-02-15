import { Expose } from 'class-transformer';
import { PlayerEnrolment } from '../player-enrolment/entity';
import { Player } from '../player/entity';
import { Round } from '../round/entity';
import { TeamEnrolment } from '../team-enrolment/entity';

export type TournamentState = 'CREATED' | 'STARTED' | 'ENDED';

export class Tournament {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly name: string;
  @Expose()
  public readonly state: TournamentState;

  #playerEnrolments: PlayerEnrolment[] = [];
  #teamEnrolments: TeamEnrolment[] = [];
  #singleRounds: Round<PlayerEnrolment>[] = [];
  #doubleRounds: Round<TeamEnrolment>[] = [];

  constructor(id: number, name: string, state: TournamentState) {
    this.id = id;
    this.name = name;
    this.state = state;
  }

  canEnrolPlayer(player: Player) {
    return this.singlePlayers.find((p) => p.equals(player));
  }

  enrolPlayer(player: PlayerEnrolment) {
    if (this.#playerEnrolments.find((p) => p.id === player.id)) {
      throw new Error('Player already enrolled');
    }
    this.#playerEnrolments.push(player);
  }

  enrolPlayers(players: PlayerEnrolment[]) {
    players.forEach((player) => this.enrolPlayer(player));
  }

  @Expose()
  get playerEnrolments() {
    return this.#playerEnrolments;
  }

  get singlePlayers() {
    return this.#playerEnrolments.map((player) => player.player);
  }

  /**
   * check if two players can enrol as a team
   * @param player1 player 1
   * @param player2 player 2
   * @returns
   */
  canEnrolTeam(player1: Player, player2: Player) {
    return (
      !this.teamPlayers.find((p) => p.equals(player1)) &&
      !this.teamPlayers.find((p) => p.equals(player2))
    );
  }

  enrolTeam(team: TeamEnrolment) {
    if (this.#teamEnrolments.find((t) => t.id === team.id)) {
      throw new Error('Team already enrolled');
    }
    if (this.teamPlayers.find((p) => p.id === team.team.player1.id)) {
      throw new Error('Player 1 already enrolled in another team');
    }
    if (this.teamPlayers.find((p) => p.id === team.team.player2.id)) {
      throw new Error('Player 2 already enrolled in another team');
    }
    this.#teamEnrolments.push(team);
  }

  enrolTeams(teams: TeamEnrolment[]) {
    teams.forEach((team) => this.enrolTeam(team));
  }

  @Expose()
  get teamEnrolments() {
    return this.#teamEnrolments;
  }

  get teamPlayers() {
    return this.#teamEnrolments.flatMap((team) => [
      team.team.player1,
      team.team.player2,
    ]);
  }

  addSingleRound(round: Round<PlayerEnrolment>) {
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

  @Expose()
  get singleRounds() {
    return this.#singleRounds;
  }

  @Expose()
  get doubleRounds() {
    return this.#doubleRounds;
  }
}
