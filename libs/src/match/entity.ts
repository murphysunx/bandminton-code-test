import { Player } from '../player/entity';
import { TeamEnrolment } from '../team-enrolment/entity';
import { isMatchFinalScores } from './utils';

export type MatchUnit = Player | TeamEnrolment;

export class Match<U extends MatchUnit> {
  #score1?: number;
  #score2?: number;
  #state: 'PRISTINE' | 'OVER' = 'PRISTINE';

  constructor(
    public readonly id: number,
    public readonly roundId: number,
    public readonly player1: U,
    public readonly player2: U
  ) {
    if (!player1) {
      throw new Error('Player 1 is required');
    }
    if (!player2) {
      throw new Error('Player 2 is required');
    }
    if (Object.getPrototypeOf(player1) !== Object.getPrototypeOf(player2)) {
      throw new Error('Players must be of the same type');
    }
    if (
      player1 instanceof Player &&
      player2 instanceof Player &&
      player1.equals(player2)
    ) {
      throw new Error('Players cannot be the same');
    }
    if (
      player1 instanceof TeamEnrolment &&
      player2 instanceof TeamEnrolment &&
      player1.equals(player2)
    )
      throw new Error('Teams cannot be the same');
  }

  updateScore(score1: number | undefined, score2: number | undefined) {
    this.#score1 = score1;
    this.#score2 = score2;
  }

  get score() {
    return [this.#score1, this.#score2];
  }

  updateState(state: 'PRISTINE' | 'OVER') {
    this.#state = state;
  }

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
    return this.#score1 > this.#score2 ? this.player1 : this.player2;
  }

  get loser() {
    if (this.#score1 === void 0)
      throw new Error("Player 1's score is not updated");
    if (this.#score2 === void 0)
      throw new Error("Player 2's score is not updated");
    if (!this.isFinished) throw new Error('Match is not finished');
    return this.#score1 < this.#score2 ? this.player1 : this.player2;
  }

  get matchType() {
    if (this.player1 instanceof Player) return 'SINGLE';
    return 'DOUBLE';
  }
}
