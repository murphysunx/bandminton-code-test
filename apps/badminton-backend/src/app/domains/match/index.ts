import { IJudgeProfile, IMatch, IMatchResult } from './type';
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
      score: void 0,
      signed: false,
    };
    this.#competitor2 = {
      competitor: unit2,
      score: void 0,
      signed: false,
    };
  }

  private getCompetitorProfile(unit: T): ICompetitorProfile<T> {
    if (unit === this.#competitor1.competitor) {
      return this.#competitor1;
    }
    if (unit === this.#competitor2.competitor) {
      return this.#competitor2;
    }
    throw new Error('Invalid competitor');
  }

  updateScore(competitor: T, score: number): void {
    const profile = this.getCompetitorProfile(competitor);
    profile.score = score;
  }

  signByCompetitor(competitor: T): void {
    const profile = this.getCompetitorProfile(competitor);
    if (profile.score === void 0) {
      throw new Error('Score not set');
    }
    if (profile.signed) {
      throw new Error(`Already signed by ${competitor.name}`);
    }
    profile.signed = true;
  }

  signByJudge(judge: IJudge): void {
    if (judge !== this.judge.judge) {
      throw new Error('Wrong judge');
    }
    if (
      this.competitor1.score === void 0 ||
      this.competitor2.score === void 0
    ) {
      throw new Error('Score not set');
    }
    if (this.#judge.signed) {
      throw new Error(`Already signed by the judge ${this.judge.judge.name}`);
    }
    this.#judge.signed = true;
  }

  private isFinished(): boolean {
    return (
      this.#competitor1.signed && this.#competitor2.signed && this.#judge.signed
    );
  }

  private isScored(): boolean {
    return (
      this.#competitor1.score !== void 0 && this.#competitor2.score !== void 0
    );
  }

  getWiner(): ICompetitorProfile<T> | null {
    if (this.isFinished()) {
      return this.#competitor1.score > this.#competitor2.score
        ? this.#competitor1
        : this.#competitor2;
    }
    return null;
  }

  getLoser(): ICompetitorProfile<T> | null {
    if (this.isFinished()) {
      return this.#competitor1.score < this.#competitor2.score
        ? this.#competitor1
        : this.#competitor2;
    }
    return null;
  }

  getMatchResult(): IMatchResult {
    if (this.isFinished()) {
      const winner = this.getWiner();
      const loser = this.getLoser();
      return {
        winner: {
          unit: winner.competitor,
          points: winner.score - loser.score,
        },
        loser: {
          unit: loser.competitor,
          points: loser.score - winner.score,
        },
      };
    }
    return null;
  }
}
