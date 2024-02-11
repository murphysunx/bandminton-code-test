import { Player } from '../player/entity';

/**
 * Team entity
 */
export class TeamEnrolment {
  constructor(
    public readonly id: number,
    public readonly tournamentId: number,
    public readonly player1: Player,
    public readonly player2: Player
  ) {}

  /**
   * Team name
   */
  get name() {
    return `${this.player1.name} & ${this.player2.name}`;
  }

  equals(team: TeamEnrolment) {
    return this.id === team.id;
  }
}
