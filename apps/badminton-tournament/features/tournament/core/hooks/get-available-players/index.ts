import { IPlayer } from '@libs/player';
import { ENDPOINT } from '../../../../../core';
import { useCallback, useState } from 'react';

export function useGetAvailablePlayers(tournamentId: number) {
  const [isFetchingAvailablePlayers, setFetchingAvailablePlayers] =
    useState<boolean>();
  const [fetchingAvailablePlayersError, setFetchingAvailablePlayersError] =
    useState<string>();
  const [availablePlayers, setAvailablePlayers] = useState<IPlayer[]>();

  const fetchAvailablePlayers = useCallback(async () => {
    setFetchingAvailablePlayers(true);
    setFetchingAvailablePlayersError(void 0);
    setAvailablePlayers(void 0);
    try {
      const response = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/players`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const availablePlayers: IPlayer[] = await response.json();
      setAvailablePlayers(availablePlayers);
      return availablePlayers;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setFetchingAvailablePlayersError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setFetchingAvailablePlayers(false);
    }
  }, [tournamentId]);
  return {
    isFetchingAvailablePlayers,
    fetchingAvailablePlayersError,
    availablePlayers,
    fetchAvailablePlayers,
  };
}
