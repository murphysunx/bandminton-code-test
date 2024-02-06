import { Round } from '../round/entity';
import { Player } from '../player/entity';
import { Team } from '../team/index';

export class Tournament {
  readonly name: string;
  #players: Player[] = [];
  #teams: Team[] = [];
  #rounds: Round[] = [];

  constructor(name: string) {
    this.name = name;
  }

  enrolPlayer(player: Player) {
    this.#players.push(player);
  }

  get players() {
    return this.#players;
  }

  enrolTeam(team: Team) {
    this.#teams.push(team);
  }

  get teams() {
    return this.#teams;
  }

  addRound(round: Round) {
    this.#rounds.push(round);
  }

  // get isReady
}
