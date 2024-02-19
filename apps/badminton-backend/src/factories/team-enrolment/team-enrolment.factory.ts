import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { TeamEnrolment as Model } from '@prisma/client';

@Injectable()
export class TeamEnrolmentFactory {
  create(model: Model): TeamEnrolment {
    return new TeamEnrolment(
      model.id,
      model.tournamentId,
      model.player1Id,
      model.player2Id
    );
  }
}
