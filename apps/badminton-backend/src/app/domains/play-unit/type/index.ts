import { IMatch } from '../../match/type';

/**
 * a unit of actor(s) in a match
 */
export interface IPlayUnit {
  /**
   * name of the play unit
   */
  name: string;
  /**
   * acknowledge the match and its result
   * @param match match to be signed
   */
  sign(match: IMatch): void;
}

export interface IPlayer extends IPlayUnit {
  /**
   * age of the player
   */
  readonly age: number;
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

export interface IJudge extends IPlayer {
  /**
   * give a judgement on the match
   * @param match match to be judged
   * @param socreA score of competitor A
   * @param scoreB score of competitor B
   */
  judge(match: IMatch, socreA: number, scoreB: number): void;
}
