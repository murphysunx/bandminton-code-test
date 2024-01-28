import { validatePlayerName } from '../../player/core/validators';
import { IMatchPlayer } from '../interfaces';
import { MAX_MATCH_SCORE, MIN_MATCH_SCORE } from './constants';

export function validateScore(score: number | undefined): boolean {
  return (
    score !== void 0 && score >= MIN_MATCH_SCORE && score <= MAX_MATCH_SCORE
  );
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
