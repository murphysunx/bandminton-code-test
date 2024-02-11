import { UpdateMatchResultPayload } from '@libs/match';
import { IPlayer } from '@libs/player';
import { CreateTeamPayload } from '@libs/team-enrolment';
import { CreateTournamentPayload, ITournament } from '@libs/tournament';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';

@Controller('tournaments')
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

  @Get(':id')
  async get(@Param('id') id: number): Promise<ITournament> {
    try {
      const tournament = await this.tournamentService.get(id);
      return tournament;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/enrollments')
  async getEnrolledPlayers(@Param('id') id: number): Promise<IPlayer[]> {
    try {
      const players = await this.tournamentService.getEnrolledPlayers(id);
      return players;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/enrollments')
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

  @Get(':id/players')
  async getAvailablePlayers(@Param('id') id: number): Promise<IPlayer[]> {
    try {
      const players = await this.tournamentService.getAvailablePlayers(id);
      return players;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/team-enrollments')
  async getEnrolledTeams(@Param('id') id: number) {
    try {
      const teams = await this.tournamentService.getEnrolledTeams(id);
      return teams;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/team-enrollments')
  async enrolTeam(@Param('id') id: number, @Body() body: CreateTeamPayload) {
    try {
      const team = await this.tournamentService.enrolTeam(
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

  @Get(':id/team-players')
  async getAvailableTeamPlayers(@Param('id') id: number): Promise<IPlayer[]> {
    try {
      const players = await this.tournamentService.getAvailablePlayersForTeam(
        id
      );
      return players;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/start')
  async start(@Param('id') id: number) {
    try {
      const tournament = await this.tournamentService.start(id);
      return tournament;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/single-rounds/latest')
  async getLatestSingleRound(@Param('id') id: number) {
    try {
      const round = await this.tournamentService.getLatestSingleRound(id);
      return round;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/double-rounds/latest')
  async getLatestDoubleRound(@Param('id') id: number) {
    try {
      const round = await this.tournamentService.getLatestDoubleRound(id);
      return round;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/rounds/:roundId/matches/:matchId')
  async updateMatch(
    @Param('id') id: number,
    @Param('roundId') roundId: number,
    @Param('matchId') matchId: number,
    @Body() body: UpdateMatchResultPayload
  ) {
    try {
      const match = await this.tournamentService.updateMatchScore(
        id,
        roundId,
        matchId,
        body.score1,
        body.score2
      );
      return match;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/rounds/:roundId/next')
  async nextRound(@Param('id') id: number, @Param('roundId') roundId: number) {
    try {
      const round = await this.tournamentService.nextRound(id, roundId);
      return round;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
