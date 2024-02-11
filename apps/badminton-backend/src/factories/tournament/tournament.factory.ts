import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { Tournament as TournamentModel } from '@prisma/client';

@Injectable()
export class TournamentFactoryService {
  create({ id, name, state }: TournamentModel): Tournament {
    return new Tournament(id, name, state);
  }
}
