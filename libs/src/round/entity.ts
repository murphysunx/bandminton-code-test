import { Match } from '../match/entity';

export class Round {
  #matches: Match[] = [];

  addMatch(match: Match) {
    this.#matches.push(match);
  }

  get matches() {
    return this.#matches;
  }

  get isFinished() {
    return this.#matches.every((match) => match.isFinished);
  }

  updateScore(match: Match, score1: number, score2: number) {
    match.updateScore(score1, score2);
  }
}
