import { Player } from '../player/entity';

/**
 * Team entity
 */
export class Team {
  readonly player1: Player;
  readonly player2: Player;

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
}
