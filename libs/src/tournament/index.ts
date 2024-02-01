import { TournamentTeam } from '../team/index';
import { IPlayer } from '../player/index';

export interface ITournament {
  id: number;
  name: string;
}

export type CreateTournamentPayload = {
  name: string;
};

export type EnrolPlayerResponse = {
  tournament: ITournament;
  player: IPlayer;
};

export const MIN_PLAYERS = 8;

export function isEvenArray(items: unknown[]) {
  return items && items.length % 2 === 0;
}

export function isPlayersReadyToStart(players: IPlayer[]) {
  return players && players.length >= MIN_PLAYERS && isEvenArray(players);
}

export const MIN_TEAMS = 4;

export function isTeamsReadyToStart(teams: TournamentTeam[]) {
  return (
    !teams ||
    teams.length === 0 ||
    (teams.length >= MIN_TEAMS && isEvenArray(teams))
  );
}

export function isTournamentReadyToStart(players: IPlayer[], teams: TournamentTeam[]) {
  const ready = isPlayersReadyToStart(players) && isTeamsReadyToStart(teams);
  return ready;
}

export function getTournamentNotReadyMessage(
  players: IPlayer[],
  teams: TournamentTeam[]
) {
  if (!isEvenArray(players)) {
    return 'Players must be even';
  }
  if (!isPlayersReadyToStart(players)) {
    return `Minimum ${MIN_PLAYERS} players required to start`;
  }
  if (teams && !isEvenArray(teams)) {
    return 'Teams must be even';
  }
  if (!isTeamsReadyToStart(teams)) {
    return `Minimum ${MIN_TEAMS} teams required to start`;
  }
  return 'Unknown error';
}
