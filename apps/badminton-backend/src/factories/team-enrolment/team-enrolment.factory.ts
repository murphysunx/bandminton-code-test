import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Team } from '@libs/team/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamEnrolmentFactory {
  create(id: number, tournamentId: number, team: Team): TeamEnrolment {
    return new TeamEnrolment(id, tournamentId, team);
  }
}
