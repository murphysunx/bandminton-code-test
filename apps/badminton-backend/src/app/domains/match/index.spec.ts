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
    expect(match.competitor1.score).toEqual(void 0);
    expect(match.competitor2.score).toEqual(void 0);
  });

  it('a new match should have no signed', () => {
    const match = new Match(judge, unit1, unit2);
    expect(match.competitor1.signed).toEqual(false);
    expect(match.competitor2.signed).toEqual(false);
  });

  it('a new match should have no winner', () => {
    const match = new Match(judge, unit1, unit2);
    const winner = match.getWiner();
    expect(winner).toBeNull();
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
    match.signByCompetitor(unit1);
    expect(match.competitor1.signed).toEqual(true);
  });

  it('the first competitor cannot sign before the score is updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => match.signByCompetitor(unit1)).toThrowError();
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
    match.signByCompetitor(unit2);
    expect(match.competitor2.signed).toEqual(true);
  });

  it('the second competitor cannot sign before the score is updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => match.signByCompetitor(unit2)).toThrowError();
  });

  it('the judge cannot sign when no scores are updated', () => {
    const match = new Match(judge, unit1, unit2);
    expect(() => judge.sign(match)).toThrowError();
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
    expect(() => match.signByJudge(judge)).not.toThrowError();
    const judgeProfile = match.judge;
    expect(judgeProfile.signed).toEqual(true);
  });

  it('a match cannot be signed by a wrong competitor', () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    match.updateScore(unit2, 2);
    const wrongCompetitor = new Player('wrong competitor', 22);
    expect(() => match.signByCompetitor(wrongCompetitor)).toThrowError();
  });

  it('a match cannot be signed by a wrong judge', () => {
    const match = new Match(judge, unit1, unit2);
    match.updateScore(unit1, 21);
    match.updateScore(unit2, 2);
    const wrongJudge = new Judge('wrong judge', 22);
    expect(() => match.signByJudge(wrongJudge)).toThrowError();
  });
});
