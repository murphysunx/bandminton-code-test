import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(form: CreatePlayerPayload): Promise<IPlayer> {
    return this.prisma.player.create({
      data: {
        name: form.name,
      },
    });
  }

  async getPlayers(): Promise<IPlayer[]> {
    return this.prisma.player.findMany();
  }
}
