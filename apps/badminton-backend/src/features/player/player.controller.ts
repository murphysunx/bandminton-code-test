import { Player } from '@libs/player/entity';
import { CreatePlayerPayload } from '@libs/player/type';
import { Body, Controller, Post } from '@nestjs/common';
import { PlayerUseCases } from '../../use-cases/player/player.use-case';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerUseCases: PlayerUseCases) {}

  @Post()
  async create(@Body() body: CreatePlayerPayload): Promise<Player> {
    const player = await this.playerUseCases.create(body.name);
    return player;
  }
}
