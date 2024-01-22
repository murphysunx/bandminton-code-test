import { IJudgeProfile, IMatch } from './type';
import { IJudge, IPlayUnit } from '../play-unit/type';
import { ICompetitorProfile } from './type';

export class Match<T extends IPlayUnit> implements IMatch<T> {
  #judge: IJudgeProfile;
  #competitor1: ICompetitorProfile<T>;
  #competitor2: ICompetitorProfile<T>;

  get judge(): IJudgeProfile {
    return this.#judge;
  }

  get competitor1(): ICompetitorProfile<T> {
    return this.#competitor1;
  }

  get competitor2(): ICompetitorProfile<T> {
    return this.#competitor2;
  }

  constructor(judge: IJudge, unit1: T, unit2: T) {
    this.#judge = {
      judge,
      signed: false,
    };
    this.#competitor1 = {
      competitor: unit1,
      score: 0,
      signed: false,
    };
    this.#competitor2 = {
      competitor: unit2,
      score: 0,
      signed: false,
    };
  }

  updateScore(competitor: T, score: number): void {
    throw new Error('Method not implemented.');
  }

  getWiner(): ICompetitorProfile<T> | null {
    throw new Error('Method not implemented.');
  }

  getLoser(): ICompetitorProfile<T> | null {
    throw new Error('Method not implemented.');
  }
}
