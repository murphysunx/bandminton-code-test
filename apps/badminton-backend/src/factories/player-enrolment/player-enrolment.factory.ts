import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { PlayerEnrolment as Model } from '@prisma/client';

@Injectable()
export class PlayerEnrolmentFactoryService {
  constructor() {}

  create(model: Model): PlayerEnrolment {
    return new PlayerEnrolment(model.id, model.tournamentId, model.playerId);
  }
}
