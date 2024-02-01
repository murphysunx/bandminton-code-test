import { IPlayer } from '@libs/player';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useEnrolPlayer(tournamentId: number) {
  const [isEnrollingPlayer, setEnrollingPlayer] = useState<boolean>();
  const [enrollingPlayerError, setEnrollingPlayerError] = useState<string>();
  const [enrolledPlayer, setEnrolledPlayer] = useState<IPlayer>();

  const enrolPlayer = useCallback(
    async (player: IPlayer) => {
      setEnrollingPlayer(true);
      setEnrollingPlayerError(void 0);
      setEnrolledPlayer(void 0);
      try {
        const response = await fetch(
          `${ENDPOINT}/tournaments/${tournamentId}/enrollments`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerId: player.id }),
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const enrolledPlayer: IPlayer = await response.json();
        setEnrolledPlayer(enrolledPlayer);
        return enrolledPlayer;
      } catch (e) {
        const error = e as Error;
        const errorMessage = error.message || 'Unknown error';
        setEnrollingPlayerError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setEnrollingPlayer(false);
      }
    },
    [tournamentId]
  );

  return {
    isEnrollingPlayer,
    enrollingPlayerError,
    enrolledPlayer,
    enrolPlayer,
  };
}
