import { Expose } from 'class-transformer';
import { Match, MatchUnit } from '../match/entity';

export class Round<U extends MatchUnit> {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly index: number;

  @Expose()
  public readonly tournamentId: number;

  #state: 'CREATED' | 'FINISHED' = 'CREATED';
  #matches: Match<U>[] = [];

  constructor(id: number, index: number, tournamentId: number) {
    this.id = id;
    this.index = index;
    this.tournamentId = tournamentId;
  }

  addMatch(match: Match<U>) {
    this.#matches.push(match);
  }

  addMatches(matches: Match<U>[]) {
    this.#matches = matches;
  }

  @Expose()
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

  @Expose()
  get state() {
    return this.#state;
  }
}
