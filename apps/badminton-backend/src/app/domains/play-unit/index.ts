/**
 * a unit of actor(s) in a match
 */
export interface IPlayUnit {
  /**
   * name of the play unit
   */
  name: string;
  /**
   * whether the play unit is ready to play
   */
  readonly ready: boolean;
  /**
   * get ready to play
   */
  getReady(): void;
}

interface IPlayer extends IPlayUnit {
  age: number;
}

interface ITeam extends IPlayUnit {
  players: IPlayer[];
  addPlayer: (player: IPlayer) => void;
}

abstract class Playable implements IPlayUnit {
  constructor(public name: string) {}

  abstract get ready(): boolean;

  abstract getReady(): void;
}

export class Player extends Playable implements IPlayer {
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

export class Team extends Playable implements ITeam {
  #players: IPlayer[] = [];

  get ready(): boolean {
    throw new Error('Method not implemented.');
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
    } else {
      throw new Error('Team is full');
    }
  }

  getReady(): void {
    throw new Error('Method not implemented.');
  }
}
