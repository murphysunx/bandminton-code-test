import { Match, MatchUnit } from '../match/entity';

export class Round<U extends MatchUnit> {
  #state: 'CREATED' | 'FINISHED' = 'CREATED';
  #matches: Match<U>[] = [];

  constructor(
    public readonly id: number,
    public readonly index: number,
    public readonly tournamentId: number
  ) {}

  addMatch(match: Match<U>) {
    this.#matches.push(match);
  }

  addMatches(matches: Match<U>[]) {
    this.#matches = matches;
  }

  get matches() {
    return this.#matches;
  }

  get isFinished() {
    return this.#matches.every((match) => match.isFinished);
  }

  updateScore(match: Match<U>, score1: number, score2: number) {
    match.updateScore(score1, score2);
  }

  updateState(state: 'CREATED' | 'FINISHED') {
    this.#state = state;
  }

  get state() {
    return this.#state;
  }
}
