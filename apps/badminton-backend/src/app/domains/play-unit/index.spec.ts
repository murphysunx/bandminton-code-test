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

  it('should be able to get player ready status', () => {
    const player = new Player('John', 20);
    expect(player.ready).toEqual(false);
  });

  it('should be able to get player ready status after getting ready', () => {
    const player = new Player('John', 20);
    player.getReady();
    expect(player.ready).toEqual(true);
  });

  it('should be able to create a team', () => {
    const team = new Team('Team A');
    expect(team).toBeDefined();
  });

  it('should be able to get team name', () => {
    const name = 'Team A';
    const team = new Team(name);
    expect(team.name).toEqual(name);
  });

  it('a team without players should not be ready', () => {
    const team = new Team('Team A');
    expect(team.ready).toEqual(false);
  });

  it('should be able to add a player to a new team', () => {
    const team = new Team('Team A');
    const player = new Player('John', 20);
    team.addPlayer(player);
    expect(team.players.length).toEqual(1);
    expect(team.players[0]).toEqual(player);
  });

  it('a team with one player should not be ready', () => {
    const team = new Team('Team A');
    const player = new Player('John', 20);
    team.addPlayer(player);
    expect(team.ready).toEqual(false);
  });

  it('should be able to add two players to a new team', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    expect(team.players.length).toEqual(2);
    expect(team.players[0]).toEqual(player1);
    expect(team.players[1]).toEqual(player2);
  });

  it('a team with two players should not be ready when players are not ready', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    expect(team.ready).toEqual(false);
  });

  it('a team with two players should not be ready when one player is not ready', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    player1.getReady();
    expect(team.ready).toEqual(false);
  });

  it('a team with two players should be ready when both players are ready', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    player1.getReady();
    player2.getReady();
    expect(team.ready).toEqual(true);
  });

  it('should not be able to add more than two players to a new team', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const player3 = new Player('Joe', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    expect(() => team.addPlayer(player3)).toThrowError();
  });
});
