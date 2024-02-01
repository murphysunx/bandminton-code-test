import { CreatePlayerPayload } from '@libs/player';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useEnrolNewPlayer(id: number) {
  const [isEnrollingNewPlayer, setEnrollingNewPlayer] = useState<boolean>();
  const [enrollingNewPlayerError, setEnrollingNewPlayerError] =
    useState<string>();
  const [enrolledNewPlayer, setEnrolledNewPlayer] =
    useState<CreatePlayerPayload | null>();

  const enrolNewPlayer = useCallback(
    async (playerData: CreatePlayerPayload) => {
      setEnrollingNewPlayer(true);
      setEnrollingNewPlayerError(void 0);
      setEnrolledNewPlayer(null);
      try {
        const response = await fetch(`${ENDPOINT}/tournaments/${id}/players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const player: CreatePlayerPayload = await response.json();
        setEnrolledNewPlayer(player);
        return player;
      } catch (e) {
        const error = e as Error;
        const errorMessage = error.message || 'Unknown error';
        setEnrollingNewPlayerError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setEnrollingNewPlayer(false);
      }
    },
    [id]
  );

  return {
    isEnrollingNewPlayer,
    enrollingNewPlayerError,
    enrolledNewPlayer,
    enrolNewPlayer,
  };
}
