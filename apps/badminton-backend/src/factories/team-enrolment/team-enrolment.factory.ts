import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamEnrolmentFactory {
  create(
    id: number,
    tournamentId: number,
    player1: Player,
    player2: Player
  ): TeamEnrolment {
    return new TeamEnrolment(id, tournamentId, player1, player2);
  }
}
