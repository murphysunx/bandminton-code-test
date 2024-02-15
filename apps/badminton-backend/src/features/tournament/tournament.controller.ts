import { Tournament } from '@libs/tournament/entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTournamentDto } from '../../core/dtos/tournament.dto';
import { TournamentUseCases } from '../../use-cases/tournament/tournament.use-case';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentUseCases: TournamentUseCases) {}

  @Post()
  async create(@Body() body: CreateTournamentDto): Promise<Tournament> {
    const tournament = await this.tournamentUseCases.create(body.name);
    return tournament;
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Tournament> {
    const tournament = await this.tournamentUseCases.getTournamentById(id);
    return tournament;
  }

  @Get()
  async getAll(): Promise<Tournament[]> {
    const tournaments = await this.tournamentUseCases.getAllTournaments();
    return tournaments;
  }
}
