import { MatchGenerator } from './index';

describe('Matcher', () => {

  function validateMatchGenerator(matcher: MatchGenerator) {
    const rankings = matcher.rank();
    const matches = matcher.generateNextRound();
    expect(matches.length).toBe(2);
    for (const match of matches) {
      expect(match).toBeDefined();
      expect(match.length).toBe(2);
      const [player1, player2] = match;
      expect(player1).toBeDefined();
      expect(player2).toBeDefined();
      expect(player1).not.toBe(player2);
      expect(
        matcher.playerDict[player1].history.findIndex((v) => v.name === player2)
      ).toBe(-1);
      const player1Rank = rankings.findIndex((v) => v.name === player1);
      const player2Rank = rankings.findIndex((v) => v.name === player2);
      expect(Math.abs(player1Rank - player2Rank)).toBeLessThan(11);
    }
  }

  it('should be able to create a match geneartor', () => {
    const matcher = new MatchGenerator([
      [
        {
          winner: 'Player 1',
          loser: 'Player 2',
          points: 10,
        },
      ],
    ]);
    expect(matcher).toBeDefined();
  });

  it('should be able to get ranks', () => {
    const matcher = new MatchGenerator([
      [
        {
          winner: 'Player 1',
          loser: 'Player 2',
          points: 10,
        },
        {
          winner: 'Player 3',
          loser: 'Player 4',
          points: 5,
        },
      ],
      [
        {
          winner: 'Player 1',
          loser: 'Player 3',
          points: 20,
        },
        {
          winner: 'Player 2',
          loser: 'Player 4',
          points: 5,
        },
      ],
    ]);
    // Player 1/2/30
    // Player 2/1/-5
    // Player 3/1/-15
    // Player 4/0/-5
    const ranks = matcher.rank();
    expect(ranks[0].name).toBe('Player 1');
    expect(ranks[0].primaryPoints).toBe(2);
    expect(ranks[0].secondaryPoints).toBe(30);
    expect(ranks[1].name).toBe('Player 2');
    expect(ranks[1].primaryPoints).toBe(1);
    expect(ranks[1].secondaryPoints).toBe(-5);
    expect(ranks[2].name).toBe('Player 3');
    expect(ranks[2].primaryPoints).toBe(1);
    expect(ranks[2].secondaryPoints).toBe(-15);
    expect(ranks[3].name).toBe('Player 4');
    expect(ranks[3].primaryPoints).toBe(0);
    expect(ranks[3].secondaryPoints).toBe(-10);
  });

  it('should be able to use secondary points as a tie breaker', () => {
    const matcher = new MatchGenerator([
      [
        {
          winner: 'Player 1',
          loser: 'Player 2',
          points: 10,
        },
        {
          winner: 'Player 3',
          loser: 'Player 4',
          points: 5,
        },
      ],
      [
        {
          winner: 'Player 1',
          loser: 'Player 3',
          points: 20,
        },
        {
          winner: 'Player 2',
          loser: 'Player 4',
          points: 5,
        },
      ],
    ]);
    validateMatchGenerator(matcher);
  });
});
