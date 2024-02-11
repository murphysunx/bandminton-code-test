import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../../core/dtos/tournament.dto';
import { GenericRepository } from '../../repositories/generic-repo.abstract';
import { PlayerEnrolmentRepoQuery } from '../../repositories/player-enrolment/player-enrolment.query';
import { TeamEnrolmentRepoQuery } from '../../repositories/team-enrolment/team-enrolment.query';
import { TournamentRepoQuery } from '../../repositories/tournament/tournament.query';

@Injectable()
export class TournamentUseCases {
  constructor(
    private readonly repository: GenericRepository<
      Tournament,
      TournamentRepoQuery
    >,
    private readonly playerEnrolmentRepository: GenericRepository<
      PlayerEnrolment,
      PlayerEnrolmentRepoQuery
    >,
    private readonly teamEnrolmentRepository: GenericRepository<
      TeamEnrolment,
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
    this.playerEnrolmentRepository.create(playerId, tournamentId);
    const tournament = await this.getTournamentById(tournamentId);
    return tournament;
  }

  // async enrolTeam(tournamentId: number, player1Id: number, player2Id: number) {
  //   this.teamEnrolmentRepository.create()
  // }
}
