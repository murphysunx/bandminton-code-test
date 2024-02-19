import { Match, MatchUnit } from '@libs/match/entity';
import { PlayerEnrolment } from '@libs/player-enrolment/entity';
import { TeamEnrolment } from '@libs/team-enrolment/entity';
import { Injectable } from '@nestjs/common';
import { Match as MatchModel } from '@prisma/client';

@Injectable()
export class MatchFactoryService {
  createSimple(model: MatchModel) {
    const enrolmentId1 =
      model.matchType === 'SINGLE' ? model.player1Id : model.team1Id;
    const enrolmentId2 =
      model.matchType === 'SINGLE' ? model.player2Id : model.team2Id;
    return new Match<MatchUnit>(
      model.id,
      model.roundId,
      enrolmentId1!,
      enrolmentId2!
    );
  }
  /**
   * create single match
   * @param model match model
   * @param player1 player 1
   * @param player2 player 2
   * @returns match
   */
  createSingle(
    id: number,
    roundId: number,
    player1: {
      player: PlayerEnrolment;
      score?: number;
    },
    player2: {
      player: PlayerEnrolment;
      score?: number;
    },
    state: MatchModel['state']
  ): Match<PlayerEnrolment> {
    const match = new Match<PlayerEnrolment>(
      id,
      roundId,
      player1.player.id,
      player2.player.id
    );
    match.setEnrolments(player1.player, player2.player);
    match.updateScore(player1.score, player2.score);
    match.updateState(state);
    return match;
  }
  /**
   * create double match
   * @param model match model
   * @param team1 team 1
   * @param team2 team 2
   * @returns match
   */
  createDouble(
    id: number,
    roundId: number,
    team1: { team: TeamEnrolment; score?: number },
    team2: { team: TeamEnrolment; score?: number },
    state: MatchModel['state']
  ): Match<TeamEnrolment> {
    const match = new Match<TeamEnrolment>(
      id,
      roundId,
      team1.team.id,
      team2.team.id
    );
    match.setEnrolments(team1.team, team2.team);
    match.updateScore(team1.score, team2.score);
    match.updateState(state);
    return match;
  }

  create(
    id: number,
    roundId: number,
    unit1: { unit: MatchUnit; score?: number },
    unit2: { unit: MatchUnit; score?: number },
    type: MatchModel['matchType'],
    state: MatchModel['state']
  ): Match<MatchUnit> {
    if (type === 'SINGLE') {
      return this.createSingle(
        id,
        roundId,
        { player: unit1.unit as PlayerEnrolment, score: unit1.score },
        { player: unit2.unit as PlayerEnrolment, score: unit2.score },
        state
      );
    } else if (type === 'DOUBLE') {
      return this.createDouble(
        id,
        roundId,
        { team: unit1.unit as TeamEnrolment, score: unit1.score },
        { team: unit2.unit as TeamEnrolment, score: unit2.score },
        state
      );
    }
    throw new Error('Invalid match type');
  }
}
