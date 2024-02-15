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
  public readonly team: Team;

  constructor(id: number, tournamentId: number, team: Team) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.team = team;
  }
}
