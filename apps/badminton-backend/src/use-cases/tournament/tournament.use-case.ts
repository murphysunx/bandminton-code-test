import { Tournament } from '@libs/tournament/entity';
import { Injectable } from '@nestjs/common';
import { RoundCalculatorAbstract } from '../../core/round-calculator/type';
import { PlayerEnrolmentRepository } from '../../repositories/player-enrolment/player-enrolment.repository';
import { TeamEnrolmentRepository } from '../../repositories/team-enrolment/team-enrolment.repository';
import { TournamentRepository } from '../../repositories/tournament/tournament.repository';
import { PlayerUseCases } from '../player/player.use-case';
import { RoundUseCases } from '../round/round.use-case';

@Injectable()
export class TournamentUseCases {
  constructor(
    private readonly repository: TournamentRepository,
    private readonly playerUseCases: PlayerUseCases,
    private readonly playerEnrolmentRepository: PlayerEnrolmentRepository,
    private readonly teamEnrolmentRepository: TeamEnrolmentRepository,
    private readonly roundUseCases: RoundUseCases,
    private readonly roundCalculator: RoundCalculatorAbstract
  ) {}

  async create(name: string): Promise<Tournament> {
    const tournament = await this.repository.create({ name });
    return tournament;
  }

  async getTournamentById(id: number): Promise<Tournament> {
    const tournament = await this.repository.getById(id);
    return tournament;
  }

  async getAllTournaments(): Promise<Tournament[]> {
    const tournaments = await this.repository.getAll();
    return tournaments;
  }

  async enrolPlayer(
    tournamentId: number,
    playerId: number
  ): Promise<Tournament> {
    const tournament = await this.getTournamentById(tournamentId);
    const player = await this.playerUseCases.getById(playerId);
    if (tournament.canEnrolPlayer(player)) {
      const playerEnrolment = await this.playerEnrolmentRepository.create({
        tournament,
        player,
      });
      tournament.enrolPlayer(playerEnrolment);
      return tournament;
    } else {
      throw new Error(`Player ${playerId} already enrolled`);
    }
  }

  async enrolTeam(
    tournamentId: number,
    player1Id: number,
    player2Id: number
  ): Promise<Tournament> {
    const tournament = await this.getTournamentById(tournamentId);
    const player1 = await this.playerUseCases.getById(player1Id);
    const player2 = await this.playerUseCases.getById(player2Id);
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

  async start(tournamentId: number): Promise<Tournament> {
    const tournament = await this.getTournamentById(tournamentId);
    if (tournament.state !== 'CREATED') {
      throw new Error('Tournament already started');
    }
    const singleMatches = this.roundCalculator.nextRound(
      tournament.playerEnrolments
    );
    const singleRound = await this.roundUseCases.createRoundWithMatches(
      tournament,
      'SINGLE',
      singleMatches
    );
    tournament.addSingleRound(singleRound);
    const doubleMatches = this.roundCalculator.nextRound(
      tournament.teamEnrolments
    );
    const doubleRound = await this.roundUseCases.createRoundWithMatches(
      tournament,
      'DOUBLE',
      doubleMatches
    );
    tournament.addDoubleRound(doubleRound);
    return tournament;
  }
}
