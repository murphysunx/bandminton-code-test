import { IMatch } from '../match/type';
import { IJudge, IPlayUnit, IPlayer, ITeam } from './type';

abstract class AbsPlayer implements IPlayUnit {
  constructor(public name: string) {}

  abstract sign(match: IMatch): void;
}

export class Player extends AbsPlayer implements IPlayer {
  constructor(name: string, public readonly age: number) {
    super(name);
  }

  sign(match: IMatch): void {
    match.signByCompetitor(this);
  }
}

/**
 * number of players in a team
 */
export const TEAM_SIZE = 2;

export class Team extends AbsPlayer implements ITeam {
  #players: IPlayer[] = [];

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

  sign(match: IMatch): void {
    match.signByCompetitor(this);
  }
}

export class Judge extends AbsPlayer implements IJudge {
  constructor(name: string, public readonly age: number) {
    super(name);
  }

  sign(match: IMatch): void {
    match.signByJudge(this);
  }

  judge(match: IMatch, socreA: number, scoreB: number): void {
    const { competitor1, competitor2 } = match;
    match.updateScore(competitor1.competitor, socreA);
    match.updateScore(competitor2.competitor, scoreB);
  }
}
