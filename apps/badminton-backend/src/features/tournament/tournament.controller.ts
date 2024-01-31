import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { CreateTeamPayload } from '@libs/team';
import { CreateTournamentPayload, ITournament } from '@libs/tournament';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  async create(@Body() body: CreateTournamentPayload): Promise<ITournament> {
    try {
      const tournament = await this.tournamentService.create(body);
      return tournament;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/players')
  async getPlayers(@Param('id') id: number): Promise<IPlayer[]> {
    try {
      const players = await this.tournamentService.getPlayers(id);
      return players;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/players')
  async enrolPlayer(
    @Param('id') id: number,
    @Body() body: { playerId: number }
  ) {
    try {
      const player = await this.tournamentService.enrolPlayer(
        id,
        body.playerId
      );
      return player;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/players/new')
  async enrolNewPlayer(
    @Param('id') id: number,
    @Body() body: CreatePlayerPayload
  ) {
    try {
      const player = await this.tournamentService.enrolNewPlayer(id, body);
      return player;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/teams')
  async getTeams(@Param('id') id: number) {
    try {
      const teams = await this.tournamentService.getTeams(id);
      return teams;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/teams')
  async createTeam(@Param('id') id: number, @Body() body: CreateTeamPayload) {
    try {
      const team = await this.tournamentService.createTeam(
        id,
        body.player1Id,
        body.player2Id
      );
      return team;
    } catch (e) {
      const error: Error = e;
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
