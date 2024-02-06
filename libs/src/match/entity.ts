import { Player } from '../player/entity';
import { isMatchFinalScores } from './utils';

export class Match {
  readonly player1: Player;
  readonly player2: Player;
  #score1?: number;
  #score2?: number;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  updateScore(score1: number, score2: number) {
    this.#score1 = score1;
    this.#score2 = score2;
  }

  get score() {
    return [this.#score1, this.#score2];
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
}
