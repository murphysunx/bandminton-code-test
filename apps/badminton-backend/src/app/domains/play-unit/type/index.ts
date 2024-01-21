import { IMatch, IMatchResult } from '../../match';

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

export interface IJudge extends IPlayUnit {
  readonly match: IMatch;
  /**
   * give a judgement on the match
   * @param socreA score of competitor A
   * @param scoreB score of competitor B
   */
  judge(socreA: number, scoreB: number): IMatchResult;
  /**
   * get ready to judge the match
   */
  getReady(): void;
}

export interface IPlayer extends IPlayUnit {
  /**
   * age of the player
   */
  age: number;
  /**
   * get ready to play
   */
  getReady(): void;
}

export interface ITeam extends IPlayUnit {
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
