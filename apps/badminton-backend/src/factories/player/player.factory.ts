import { Player } from '@libs/player/entity';
import { Injectable } from '@nestjs/common';
import { Player as PlayerModel } from 'prisma/prisma-client';

@Injectable()
export class PlayerFactory {
  constructor() {}

  createFromModel({ id, name }: PlayerModel): Player {
    return new Player(id, name);
  }
}
