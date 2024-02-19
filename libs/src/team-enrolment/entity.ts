import { Expose } from 'class-transformer';
import { Team } from '../team/entity';

/**
 * Team entity
 */
export class TeamEnrolment {
  @Expose()
  public readonly id: number;
  @Expose()
  public readonly tournamentId: number;

  @Expose()
  public readonly player1Id: number;

  @Expose()
  public readonly player2Id: number;

  #team?: Team;

  @Expose()
  get team() {
    return this.#team;
  }

  constructor(
    id: number,
    tournamentId: number,
    player1Id: number,
    player2Id: number
  ) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.player1Id = player1Id;
    this.player2Id = player2Id;
  }
}
