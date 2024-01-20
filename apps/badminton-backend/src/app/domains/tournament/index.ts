import { IPlayable } from '../player';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ITournament {
  /**
   * number of rounds in the tournament
   */
  readonly rounds: number;
  /**
   * list of players in the tournament
   */
  readonly players: IPlayable[];
  /**
   * register a player in the tournament
   * @param player a player to be registered in the tournament
   */
  registerPlayer(player: IPlayable): void;
  /**
   * begin the tournament
   */
  begin(): Promise<void>;
  /**
   * get the ranking of the players
   */
  getRanking(): IPlayable[];
}

// class Tournament implements ITournament {
//   private playedRounds: number;
//   rounds: number;
//   players: IPlayer[];
// }
