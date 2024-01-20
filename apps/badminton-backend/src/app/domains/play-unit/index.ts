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
  ready: boolean;
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
  ready = false;

  constructor(public name: string) {}

  abstract getReady(): void;
}

export class Player extends Playable implements IPlayer {
  constructor(name: string, public age: number) {
    super(name);
  }

  getReady(): void {
    throw new Error('Method not implemented.');
  }
}

/**
 * number of players in a team
 */
export const TEAM_SIZE = 2;

export class Team extends Playable implements ITeam {
  #players: IPlayer[];

  get players(): IPlayer[] {
    return this.#players;
  }

  constructor(name: string) {
    super(name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPlayer(player: IPlayer) {
    new Error('Not implemented');
  }

  getReady(): void {
    throw new Error('Method not implemented.');
  }
}
