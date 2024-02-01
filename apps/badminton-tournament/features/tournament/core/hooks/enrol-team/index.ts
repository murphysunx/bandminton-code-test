import { IPlayer } from '@libs/player';
import { TournamentTeam } from '@libs/team';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useEnrolTeam(tournamentId: number) {
  const [isEnrollingTeam, setEnrollingTeam] = useState<boolean>();
  const [enrollingTeamError, setEnrollingTeamError] = useState<string>();
  const [enrolledTeam, setEnrolledTeam] = useState<TournamentTeam>();

  const enrolTeam = useCallback(
    async (player1: IPlayer, player2: IPlayer) => {
      setEnrollingTeam(true);
      setEnrollingTeamError(void 0);
      // setEnrolledTeam(void 0);
      try {
        console.log('enrolTeam', player1, player2);

        const response = await fetch(
          `${ENDPOINT}/tournaments/${tournamentId}/team-enrollments`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              player1Id: player1.id,
              player2Id: player2.id,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const enrolledTeam: TournamentTeam = await response.json();
        setEnrolledTeam(enrolledTeam);
        return enrolledTeam;
      } catch (e) {
        const error = e as Error;
        const errorMessage = error.message || 'Unknown error';
        setEnrollingTeamError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setEnrollingTeam(false);
      }
    },
    [tournamentId]
  );

  return {
    isEnrollingTeam,
    enrollingTeamError,
    enrolledTeam,
    enrolTeam,
  };
}
