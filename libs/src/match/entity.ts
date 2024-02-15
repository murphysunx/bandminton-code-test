import { Expose } from 'class-transformer';
import { PlayerEnrolment } from '../player-enrolment/entity';
import { TeamEnrolment } from '../team-enrolment/entity';
import { isMatchFinalScores } from './utils';

export type MatchUnit = PlayerEnrolment | TeamEnrolment;

export class Match<U extends MatchUnit> {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly roundId: number;

  @Expose()
  public readonly enrolment1: U;

  @Expose()
  public readonly enrolment2: U;

  #score1?: number;
  #score2?: number;
  #state: 'PRISTINE' | 'OVER' = 'PRISTINE';

  constructor(id: number, roundId: number, enrolment1: U, enrolment2: U) {
    this.id = id;
    this.roundId = roundId;
    this.enrolment1 = enrolment1;
    this.enrolment2 = enrolment2;

    if (!enrolment1) {
      throw new Error('Player 1 is required');
    }
    if (!enrolment2) {
      throw new Error('Player 2 is required');
    }
    if (
      Object.getPrototypeOf(enrolment1) !== Object.getPrototypeOf(enrolment2)
    ) {
      throw new Error('Players must be of the same type');
    }
    if (
      enrolment1 instanceof PlayerEnrolment &&
      enrolment2 instanceof PlayerEnrolment &&
      enrolment1.player.equals(enrolment2.player)
    ) {
      throw new Error('Players cannot be the same');
    }
    if (
      enrolment1 instanceof TeamEnrolment &&
      enrolment2 instanceof TeamEnrolment &&
      enrolment1.team.equals(enrolment2.team)
    )
      throw new Error('Teams cannot be the same');
  }

  updateScore(score1: number | undefined, score2: number | undefined) {
    this.#score1 = score1;
    this.#score2 = score2;
  }

  get scores() {
    return [this.#score1, this.#score2];
  }

  @Expose()
  get score1() {
    return this.#score1;
  }

  @Expose()
  get score2() {
    return this.#score2;
  }

  updateState(state: 'PRISTINE' | 'OVER') {
    this.#state = state;
  }

  @Expose()
  get state() {
    return this.#state;
  }

  get isFinished() {
    if (this.#score1 === void 0 || this.#score2 === void 0) return false;
    return isMatchFinalScores(this.#score1, this.#score2);
  }

  get winner() {
    if (this.#score1 === void 0)
      throw new Error("Player 1's score is not updated");
    if (this.#score2 === void 0)
      throw new Error("Player 2's score is not updated");
    if (!this.isFinished) throw new Error('Match is not finished');
    return this.#score1 > this.#score2 ? this.enrolment1 : this.enrolment2;
  }

  get loser() {
    if (this.#score1 === void 0)
      throw new Error("Player 1's score is not updated");
    if (this.#score2 === void 0)
      throw new Error("Player 2's score is not updated");
    if (!this.isFinished) throw new Error('Match is not finished');
    return this.#score1 < this.#score2 ? this.enrolment1 : this.enrolment2;
  }

  get matchType() {
    if (this.enrolment1 instanceof PlayerEnrolment) return 'SINGLE';
    return 'DOUBLE';
  }

  get scoreDiff() {
    if (this.#score1 === void 0)
      throw new Error("Player 1's score is not updated");
    if (this.#score2 === void 0)
      throw new Error("Player 2's score is not updated");
    return Math.abs(this.#score1 - this.#score2);
  }
}
