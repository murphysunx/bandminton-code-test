import { Judge, Player } from '../play-unit';
import { IJudge, IPlayUnit } from '../play-unit/type';
import { Match } from './index';

describe('Match', () => {
  let unit1: IPlayUnit;
  let unit2: IPlayUnit;
  let judge: IJudge;

  beforeEach(() => {
    unit1 = new Player('player1', 13);
    unit2 = new Player('player2', 12);
    judge = new Judge('judge1', 22);
  });

  it('should be able to create a match', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match).toBeDefined();
  });

  it("should be able to get the fist competitor's profile", () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.competitor1.competitor).toEqual(unit1);
  });

  it("should be able to get the second competitor's profile", () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.competitor2.competitor).toEqual(unit2);
  });

  it('a new match should have no score', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.competitor1.score).toEqual(0);
    expect(match.competitor2.score).toEqual(0);
  });

  it('a new match should have no signed', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.competitor1.signed).toEqual(false);
    expect(match.competitor2.signed).toEqual(false);
  });

  it('a new match should have no winner', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.getWiner()).toBeNull();
  });

  it('a new match should have no loser', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.getLoser()).toBeNull();
  });

  it('should be able to update the score of the first competitor', () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    expect(match.competitor1.score).toEqual(21);
  });

  it("the first competitor's score is acknowledged only after the person signs", () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    expect(match.competitor1.signed).toEqual(false);
    unit1.sign(match);
    expect(match.competitor1.signed).toEqual(true);
  });

  it('the first competitor cannot sign before the score is updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => unit1.sign(match)).toThrowError(
      'The score of the competitor has not been updated yet.'
    );
  });

  it('should be able to update the score of the second competitor', () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit2, 2);
    expect(match.competitor2.score).toEqual(2);
  });

  it("the second competitor's score is acknowledged only after the person signs", () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit2, 21);
    expect(match.competitor2.signed).toEqual(false);
    unit2.sign(match);
    expect(match.competitor2.signed).toEqual(true);
  });

  it('the second competitor cannot sign before the score is updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => unit2.sign(match)).toThrowError(
      'The score of the competitor has not been updated yet.'
    );
  });

  it('the judge cannot sign when no scores are updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => judge.sign(match)).toThrowError(
      'The scores of the competitors have not been updated yet.'
    );
  });

  it("the judge cannot sign when only the competitor 1's score is updated", () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    expect(() => judge.sign(match)).toThrowError();
  });

  it("the judge cannot sign when only the competitor 2's score is updated", () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit2, 21);
    expect(() => judge.sign(match)).toThrowError();
  });

  it('the judge can sign when both the competitors scores are updated', () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    match.updateScore(unit2, 2);
    expect(() => judge.sign(match)).not.toThrowError();
    const judgeProfile = match.judge;
    expect(judgeProfile.signed).toEqual(true);
  });
});
