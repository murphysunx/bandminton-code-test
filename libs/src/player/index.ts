import { Team } from '../team/index';

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

export type RankedPlayer = {
  player: IPlayer;
  wins: number;
  points: number;
};

export type RankedTeam = {
  team: Team;
  wins: number;
  points: number;
};

export interface IRankable<T> {
  rankable: T;
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
  history: Set<T>;
}

export class Rankable<T extends { id: number }> implements IRankable<T> {
  protected _wins = 0;
  protected _points = 0;
  protected _history: Set<T> = new Set();

  constructor(public readonly rankable: T) {}

  /**
   * update wins and points when a player wins
   * @param points earned points
   */
  addWin(opponent: T, points: number): void {
    this._wins++;
    this._points += points;
    this._history.add(opponent);
  }
  /**
   * update points when a player loses
   * @param points lost points (positive number only)
   */
  addLose(opponent: T, points: number): void {
    this._points -= points;
    this._history.add(opponent);
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
