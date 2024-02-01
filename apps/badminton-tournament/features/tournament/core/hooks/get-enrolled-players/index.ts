import { IPlayer } from '@libs/player';
import { ENDPOINT } from '../../../../../core';
import { useCallback, useState } from 'react';

export function useGetEnrolledPlayers(id: number) {
  const [isFetchingEnrolledPlayers, setFetchingEnrolledPlayers] =
    useState<boolean>();
  const [fetchingEnrolledPlayersError, setFetchingEnrolledPlayersError] =
    useState<string>();
  const [enrolledPlayers, setEnrolledPlayers] = useState<IPlayer[] | null>();

  const fetchEnrolledPlayers = useCallback(async () => {
    setFetchingEnrolledPlayers(true);
    try {
      const response = await fetch(`${ENDPOINT}/tournaments/${id}/enrollments`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const players: IPlayer[] = await response.json();
      setEnrolledPlayers(players);
      return players;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setFetchingEnrolledPlayersError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setFetchingEnrolledPlayers(false);
    }
  }, [id]);

  return {
    isFetchingEnrolledPlayers,
    fetchingEnrolledPlayersError,
    enrolledPlayers,
    fetchEnrolledPlayers,
  };
}
