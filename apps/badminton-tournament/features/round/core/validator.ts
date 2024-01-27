import { IMatchPlayer } from '../interfaces';
import { MAX_MATCH_SCORE, MIN_MATCH_SCORE } from './constants';

export function validatePlayerName(
  name: string,
  invalidNames: string[] = []
): boolean {
  return name.length > 0 && !invalidNames.includes(name);
}

export function validateScore(score: number): boolean {
  return score >= MIN_MATCH_SCORE && score <= MAX_MATCH_SCORE;
}

/**
 * Validates the match result form.
 * @param param0 two players' results
 * @returns true if the form is valid
 */
export function validateMatchResultForm(
  result1: IMatchPlayer,
  result2: IMatchPlayer,
  invalidNames: string[] = []
): boolean {
  return (
    validatePlayerName(result1.name, invalidNames) &&
    validatePlayerName(result2.name, [result1.name, ...invalidNames]) &&
    validateScore(result1.score) &&
    validateScore(result2.score) &&
    result1.score !== result2.score &&
    (result1.score === MAX_MATCH_SCORE || result2.score === MAX_MATCH_SCORE)
  );
}
