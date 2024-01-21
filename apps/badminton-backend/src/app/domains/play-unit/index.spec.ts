import { Judge, Player, Team } from './index';

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

  it('should be able to create a team', () => {
    const team = new Team('Team A');
    expect(team).toBeDefined();
  });

  it('should be able to get team name', () => {
    const name = 'Team A';
    const team = new Team(name);
    expect(team.name).toEqual(name);
  });

  it('should be able to add a player to a new team', () => {
    const team = new Team('Team A');
    const player = new Player('John', 20);
    team.addPlayer(player);
    expect(team.players.length).toEqual(1);
    expect(team.players[0]).toEqual(player);
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

  it('should not be able to add more than two players to a new team', () => {
    const team = new Team('Team A');
    const player1 = new Player('John', 20);
    const player2 = new Player('Jane', 20);
    const player3 = new Player('Joe', 20);
    team.addPlayer(player1);
    team.addPlayer(player2);
    expect(() => team.addPlayer(player3)).toThrowError();
  });

  it('should be able to create a judge', () => {
    const judge = new Judge('Judge A');
    expect(judge).toBeDefined();
  });

  it('a judge should be able to judge a match', () => {
    const judge = new Judge('Judge A');
  });
});
