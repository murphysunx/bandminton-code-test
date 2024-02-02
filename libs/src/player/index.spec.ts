import { Rankable } from './index';

describe('Player', () => {
  it('should be able to create a player', () => {
    const player = new Rankable({ id: 1 });
    expect(player).toBeDefined();
  });

  it('should be able to get player name', () => {
    const player = new Rankable({ id: 1 });
    expect(player.rankable.id).toEqual(1);
  });

  it('a player should be able to add a win', () => {
    const player = new Rankable({ id: 1 });
    const player1 = new Rankable({ id: 1 });
    player.addWin(player1.rankable, 10);
    expect(player.wins).toEqual(1);
    expect(player.points).toEqual(10);
    expect(player.history.has(player1.rankable)).toBeTruthy();
  });

  it('a player should be able to add a lose', () => {
    const player = new Rankable({ id: 1 });
    const player1 = new Rankable({ id: 1 });
    player.addLose(player1.rankable, 10);
    expect(player.wins).toEqual(0);
    expect(player.points).toEqual(-10);
    expect(player.history.has(player1.rankable)).toBeTruthy();
  });
});
