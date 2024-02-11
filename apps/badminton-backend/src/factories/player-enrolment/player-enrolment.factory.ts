import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Player } from '@libs/player/entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerEnrolmentFactoryService {
  constructor() {}

  create(id: number, tournamentId: number, player: Player): PlayerEnrolment {
    return new PlayerEnrolment(id, tournamentId, player);
  }
}
