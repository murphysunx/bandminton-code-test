import { MatchUnit } from '@libs/match/entity';
import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Round } from '@libs/round/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { Round as RoundModel } from '@prisma/client';

@Injectable()
export class RoundFactory {
  createSingle(model: RoundModel): Round<PlayerEnrolment> {
    const { id, index, state, tournamentId } = model;
    const round = new Round<PlayerEnrolment>(id, index, tournamentId);
    round.updateState(state);
    return round;
  }

  createDouble(model: RoundModel): Round<TeamEnrolment> {
    const { id, index, state, tournamentId } = model;
    const round = new Round<TeamEnrolment>(id, index, tournamentId);
    round.updateState(state);
    return round;
  }

  create(model: RoundModel): Round<MatchUnit> {
    const { id, index, state, tournamentId } = model;
    const round = new Round<MatchUnit>(id, index, tournamentId);
    round.updateState(state);
    return round;
  }
}
