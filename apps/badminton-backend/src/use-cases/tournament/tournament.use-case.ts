import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { Player } from '@libs/player/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../../core/dtos/tournament.dto';
import { GenericRepository } from '../../repositories/generic-repo.abstract';
import {
  PlayerEnrolmentRepoCreate,
  PlayerEnrolmentRepoQuery,
} from '../../repositories/player-enrolment/player-enrolment.interface';
import {
  PlayerRepoCreate,
  PlayerRepoQuery,
} from '../../repositories/player/player.interface';
import {
  TeamEnrolmentRepoCreate,
  TeamEnrolmentRepoQuery,
} from '../../repositories/team-enrolment/team-enrolment.interface';
import {
  TournamentRepoCreate,
  TournamentRepoQuery,
} from '../../repositories/tournament/tournament.interface';

@Injectable()
export class TournamentUseCases {
  constructor(
    private readonly repository: GenericRepository<
      Tournament,
      TournamentRepoCreate,
      TournamentRepoQuery
    >,
    private readonly playerRepository: GenericRepository<
      Player,
      PlayerRepoCreate,
      PlayerRepoQuery
    >,
    private readonly playerEnrolmentRepository: GenericRepository<
      PlayerEnrolment,
      PlayerEnrolmentRepoCreate,
      PlayerEnrolmentRepoQuery
    >,
    private readonly teamEnrolmentRepository: GenericRepository<
      TeamEnrolment,
      TeamEnrolmentRepoCreate,
      TeamEnrolmentRepoQuery
    >
  ) {}

  async create(dto: CreateTournamentDto): Promise<Tournament> {
    const tournament = await this.repository.create(dto);
    return tournament;
  }

  async getTournamentById(id: number): Promise<Tournament> {
    const tournament = await this.repository.getById(id);
    return tournament;
  }

  async enrolPlayer(
    tournamentId: number,
    playerId: number
  ): Promise<Tournament> {
    const tournament = await this.getTournamentById(tournamentId);
    const player = await this.playerRepository.getById(playerId);
    tournament.enrolPlayer(player);
    await this.playerEnrolmentRepository.create({
      tournament,
      player,
    });
    return tournament;
  }

  async enrolTeam(
    tournamentId: number,
    player1Id: number,
    player2Id: number
  ): Promise<Tournament> {
    const tournament = await this.getTournamentById(tournamentId);
    const player1 = await this.playerRepository.getById(player1Id);
    const player2 = await this.playerRepository.getById(player2Id);
    if (tournament.canEnrolTeam(player1, player2)) {
      const teamEnrolment = await this.teamEnrolmentRepository.create({
        tournament,
        player1,
        player2,
      });
      tournament.enrolTeam(teamEnrolment);
      return tournament;
    } else {
      throw new Error(
        `Player 1 ${player1Id} or Player 2 ${player2Id} already enrolled in another team`
      );
    }
  }

  // async start(tournamentId: number): Promise<Tournament> {
  //   const tournament = await this.getTournamentById(tournamentId);
  //   tournament.start();
  //   return tournament;
  // }
}
