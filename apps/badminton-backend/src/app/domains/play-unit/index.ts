import { IMatch, IMatchResult } from '../match';
import { IJudge, IPlayUnit, IPlayer, ITeam } from './type';

abstract class AbsPlayer implements IPlayUnit {
  constructor(public name: string) {}

  abstract get ready(): boolean;
}

export class Player extends AbsPlayer implements IPlayer {
  #ready = false;

  get ready(): boolean {
    return this.#ready;
  }

  constructor(name: string, public age: number) {
    super(name);
  }

  getReady(): void {
    this.#ready = true;
  }
}

/**
 * number of players in a team
 */
export const TEAM_SIZE = 2;

export class Team extends AbsPlayer implements ITeam {
  #players: IPlayer[] = [];

  get ready(): boolean {
    if (this.#players.length === TEAM_SIZE) {
      return this.#players.every((player) => player.ready);
    } else {
      return false;
    }
  }

  get players(): IPlayer[] {
    return this.#players;
  }

  constructor(name: string) {
    super(name);
  }

  addPlayer(player: IPlayer) {
    if (this.#players.length < TEAM_SIZE) {
      this.#players.push(player);
      return this.#players.length;
    } else {
      throw new Error('Team is full');
    }
  }
}

export class Judge extends AbsPlayer implements IJudge {
  match: IMatch;

  get ready(): boolean {
    throw new Error('Method not implemented.');
  }

  getReady(): void {
    throw new Error('Method not implemented.');
  }

  judge(socreA: number, scoreB: number): IMatchResult {
    throw new Error('Method not implemented.');
  }
}
