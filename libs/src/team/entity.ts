import { Expose } from 'class-transformer';
import { Player } from '../player/entity';

export class Team {
  @Expose()
  public readonly player1: Player;

  @Expose()
  public readonly player2: Player;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  /**
   * Team name
   */
  get name() {
    return `${this.player1.name} & ${this.player2.name}`;
  }

  equals(team: Team) {
    return (
      (this.player1.id === team.player1.id &&
        this.player2.id === team.player2.id) ||
      (this.player1.id === team.player2.id &&
        this.player2.id === team.player1.id)
    );
  }
}
