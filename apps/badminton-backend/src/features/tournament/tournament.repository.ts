import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenericRepository } from '../../repositories/generic-repo.abstract';
import { Tournament } from '@prisma/client';

@Injectable()
export class TournamentRepository implements GenericRepository<Tournament> {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Tournament[]> {
    return this.prismaService.tournament.findMany();
  }
  async getById(id: number): Promise<Tournament> {
    const tournament = await this.prismaService.tournament.findUnique({
      where: {
        id,
      },
    });
    if (!tournament) {
      throw new Error(`Tournament with id ${id} not found`);
    }
    return tournament;
  }

  create(item: Omit<Tournament, 'id'>): Promise<Tournament> {
    return this.prismaService.tournament.create({
      data: {
        ...item,
      },
    });
  }
  update(id: number, item: Tournament): Promise<Tournament> {
    return this.prismaService.tournament.update({
      data: {
        ...item,
      },
      where: {
        id,
      },
    });
  }
}
