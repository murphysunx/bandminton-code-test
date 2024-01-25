import { Player, Team } from './index';

describe('Player', () => {
  it('should be able to create a player', () => {
    const player = new Player('John');
    expect(player).toBeDefined();
  });

  it('should be able to get player name', () => {
    const name = 'John';
    const player = new Player(name);
    expect(player.name).toEqual(name);
  });

  it('a player should be able to add a win', () => {
    const player = new Player('John');
    const player1 = new Player('Jane');
    player.addWin(player1, 10);
    expect(player.wins).toEqual(1);
    expect(player.points).toEqual(10);
    expect(player.history.includes(player1)).toBeTruthy();
  });

  it('a player should be able to add a lose', () => {
    const player = new Player('John');
    const player1 = new Player('Jane');
    player.addLose(player1, 10);
    expect(player.wins).toEqual(0);
    expect(player.points).toEqual(-10);
    expect(player.history.includes(player1)).toBeTruthy();
  });

  it('should be able to create a team', () => {
    const player1 = new Player('John');
    const player2 = new Player('Jane');
    const team = new Team(player1, player2);
    expect(team).toBeDefined();
  });

  it('should be able to get team players', () => {
    const player1 = new Player('John');
    const player2 = new Player('Jane');
    const team = new Team(player1, player2);
    expect(team.player1).toEqual(player1);
    expect(team.player2).toEqual(player2);
  });

  it('a team should be able to add a win', () => {
    const player1 = new Player('John');
    const player2 = new Player('Jane');
    const team1 = new Team(player1, player2);
    const player3 = new Player('Jack');
    const player4 = new Player('Jill');
    const team2 = new Team(player3, player4);
    team1.addWin(team2, 10);
    expect(team1.wins).toEqual(1);
    expect(team1.points).toEqual(10);
    expect(team1.history.includes(team2)).toBeTruthy();
  });

  it('a team should be able to add a lose', () => {
    const player1 = new Player('John');
    const player2 = new Player('Jane');
    const team1 = new Team(player1, player2);
    const player3 = new Player('Jack');
    const player4 = new Player('Jill');
    const team2 = new Team(player3, player4);
    team1.addLose(team2, 10);
    expect(team1.wins).toEqual(0);
    expect(team1.points).toEqual(-10);
    expect(team1.history.includes(team2)).toBeTruthy();
  });
});
