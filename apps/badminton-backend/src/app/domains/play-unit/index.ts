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
}

interface IPlayer extends IPlayUnit {
  age: number;
  /**
   * get ready to play
   */
  getReady(): void;
}

interface ITeam extends IPlayUnit {
  /**
   * players in the team
   */
  players: IPlayer[];
  /**
   * add a player to the team
   * @param player
   * @returns number of players in the team
   */
  addPlayer(player: IPlayer): number;
}

abstract class Playable implements IPlayUnit {
  constructor(public name: string) {}

  abstract get ready(): boolean;
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
