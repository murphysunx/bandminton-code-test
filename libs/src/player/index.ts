/**
 * players in a tournament
 */
export interface IPlayer {
  id: number;
  name: string;
}

export type CreatePlayerPayload = {
  name: string;
};

export type CreatePlayerResponse = IPlayer;

export interface IRankable {
  id: number;
  /**
   * win count
   */
  wins: number;
  /**
   * total points
   */
  points: number;
  /**
   * play history
   */
  history: { id: number; points: number }[];
}

interface IPlayHistory<T extends IRankable> {
  readonly history: T[];
}

export abstract class Rankable implements IRankable, IPlayHistory<Rankable> {
  protected _wins = 0;
  protected _points = 0;
  protected _history: (typeof this)[] = [];

  abstract readonly id: number;
  /**
   * update wins and points when a player wins
   * @param points earned points
   */
  addWin(opponent: typeof this, points: number): void {
    this._wins++;
    this._points += points;
    this._history.push(opponent);
  }
  /**
   * update points when a player loses
   * @param points lost points (positive number only)
   */
  addLose(opponent: typeof this, points: number): void {
    this._points -= points;
    this._history.push(opponent);
  }

  get wins() {
    return this._wins;
  }

  get points() {
    return this._points;
  }

  get history() {
    return this._history;
  }
}

export class Player extends Rankable {
  constructor(public readonly id: number) {
    super();
  }
}

export class Team extends Rankable {
  constructor(
    public readonly id: number,
    public readonly player1: Player,
    public readonly player2: Player
  ) {
    super();
  }

  get name() {
    return `${this.player1.id} & ${this.player2.id}`;
  }
}
