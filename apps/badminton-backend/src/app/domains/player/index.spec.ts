import { Player, Team } from './index';

describe('Player', () => {
  it('should be able to create a player', () => {
    const player = new Player('John', 20);
    expect(player).toBeDefined();
  });

  it('should be able to get player name', () => {
    const name = 'John';
    const player = new Player(name, 20);
    expect(player.name).toEqual(name);
  });

  it('should be able to get player age', () => {
    const age = 20;
    const player = new Player('John', age);
    expect(player.age).toEqual(age);
  });

  it('a player should be able to add a win', () => {
    const player = new Player('John', 20);
    const player1 = new Player('Jane', 20);
    player.addWin(player1, 10);
    expect(player.wins).toEqual(1);
    expect(player.points).toEqual(10);
    expect(player.history.includes(player1)).toBeTruthy();
  });

  it('a player should be able to add a lose', () => {
    const player = new Player('John', 20);
    const player1 = new Player('Jane', 20);
    player.addLose(player1, 10);
    expect(player.wins).toEqual(0);
    expect(player.points).toEqual(-10);
    expect(player.history.includes(player1)).toBeTruthy();
  });

  it('should be able to create a team', () => {
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const team = new Team(player1, player2);
    expect(team).toBeDefined();
  });

  it('should be able to get team players', () => {
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const team = new Team(player1, player2);
    expect(team.player1).toEqual(player1);
    expect(team.player2).toEqual(player2);
  });

  it('a team should be able to add a win', () => {
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const team1 = new Team(player1, player2);
    const player3 = new Player('Jack', 20);
    const player4 = new Player('Jill', 20);
    const team2 = new Team(player3, player4);
    team1.addWin(team2, 10);
    expect(team1.wins).toEqual(1);
    expect(team1.points).toEqual(10);
    expect(team1.history.includes(team2)).toBeTruthy();
  });

  it('a team should be able to add a lose', () => {
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const team1 = new Team(player1, player2);
    const player3 = new Player('Jack', 20);
    const player4 = new Player('Jill', 20);
    const team2 = new Team(player3, player4);
    team1.addLose(team2, 10);
    expect(team1.wins).toEqual(0);
    expect(team1.points).toEqual(-10);
    expect(team1.history.includes(team2)).toBeTruthy();
  });
});
