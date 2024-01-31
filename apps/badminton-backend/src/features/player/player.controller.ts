import { CreatePlayerPayload, IPlayer } from '@libs/player';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() body: CreatePlayerPayload): Promise<IPlayer> {
    try {
      const player = await this.playerService.create(body);
      return player;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    try {
      const players = await this.playerService.getPlayers();
      return players;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
