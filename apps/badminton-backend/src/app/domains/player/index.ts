/**
 * a unit of player
 */
export interface IPlayable {
  name: string;
}

interface IPlayer extends IPlayable {
  age: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ITeam extends IPlayable {
  players: IPlayer[];
}
