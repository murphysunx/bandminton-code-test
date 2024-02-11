import { TournamentTeam } from '@libs/team-enrolment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getTeamDetail(teamId: number): Promise<TournamentTeam> {
    const team = await this.prisma.tournamentTeam.findFirst({
      where: {
        id: teamId,
      },
      include: {
        player1: true,
        player2: true,
        tournament: true,
      },
    });
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }
}
