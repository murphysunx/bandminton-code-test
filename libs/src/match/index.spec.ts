import { validateMatchScores } from '.';

describe('validateMatchScores', () => {
  it('should return false if both scores are less than 21', () => {
    const score1 = 19;
    const score2 = 20;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });

  it('should return true if 21:19', () => {
    const score1 = 21;
    const score2 = 19;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(true);
  });

  it('should return true if 19:21', () => {
    const score1 = 21;
    const score2 = 19;
    const isValid = validateMatchScores(score2, score1);
    expect(isValid).toBe(true);
  });

  it('should return false if 21:20', () => {
    const score1 = 21;
    const score2 = 20;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });

  it('should return false if 20:21', () => {
    const score1 = 21;
    const score2 = 20;
    const isValid = validateMatchScores(score2, score1);
    expect(isValid).toBe(false);
  });

  it('should return true if 22:20', () => {
    const score1 = 22;
    const score2 = 20;
    const isValid = validateMatchScores(score2, score1);
    expect(isValid).toBe(true);
  });

  it('should return true if 30:28', () => {
    const score1 = 30;
    const score2 = 28;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(true);
  });

  it('should return false if 30:27', () => {
    const score1 = 30;
    const score2 = 27;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });

  it('should return true if 30:29', () => {
    const score1 = 30;
    const score2 = 28;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(true);
  });

  it('should return false if scores are invalid', () => {
    const score1 = 15;
    const score2 = 25;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });

  it('should return false if scores are equal', () => {
    const score1 = 21;
    const score2 = 21;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });

  it('should return false if 31:29', () => {
    const score1 = 31;
    const score2 = 29;
    const isValid = validateMatchScores(score1, score2);
    expect(isValid).toBe(false);
  });
});
