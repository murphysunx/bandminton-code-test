/**
 * validate the scores of a match
 * @param score1 score of player 1
 * @param score2 score of player 2
 * @returns if the scores are valid
 */
export function isMatchFinalScores(score1: number, score2: number): boolean {
  if (typeof score1 !== 'number' || typeof score2 !== 'number') {
    return false;
  }
  // winner must have at least 21 points and 2 points more than the loser
  // at most 30 points
  // if one player has 30 points, the game is over
  // cannot have the same score
  if (score1 === score2) {
    return false;
  }
  const winnerScore = Math.max(score1, score2);
  const loserScore = Math.min(score1, score2);
  if (winnerScore < 21) {
    return false;
  }
  if (winnerScore === 21) {
    return loserScore <= 19;
  }
  if (winnerScore > 30) {
    return false;
  }
  const scoreDiff = winnerScore - loserScore;
  if (winnerScore === 30) {
    return scoreDiff === 2 || scoreDiff === 1;
  }
  return scoreDiff === 2;
}
