import { MatchGenerator } from './index';

describe('Matcher', () => {
  it('should be able to create a match geneartor', () => {
    const matcher = new MatchGenerator([
      [
        {
          winner: 'Player 1',
          loser: 'Player 2',
          points: 10,
        },
      ],
      [
        {
          winner: 'Player 1',
          loser: 'Player 3',
          points: 20,
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
});
