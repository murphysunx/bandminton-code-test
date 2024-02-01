import { IPlayer } from '@libs/player';
import { ENDPOINT } from '../../../../../core';
import { useCallback, useState } from 'react';

export function useGetAvailableTeamPlayers(tournamentId: number) {
  const [isFetchingAvailableTeamPlayers, setFetchingAvailableTeamPlayers] =
    useState<boolean>();
  const [
    fetchingAvailableTeamPlayersError,
    setFetchingAvailableTeamPlayersError,
  ] = useState<string>();
  const [availableTeamPlayers, setAvailableTeamPlayers] = useState<IPlayer[]>();

  const fetchAvailableTeamPlayers = useCallback(async () => {
    setFetchingAvailableTeamPlayers(true);
    setFetchingAvailableTeamPlayersError(void 0);
    // setAvailableTeamPlayers(void 0);
    try {
      const response = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/team-players`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const availableTeamPlayers: IPlayer[] = await response.json();
      console.log('availableTeamPlayers', availableTeamPlayers);

      setAvailableTeamPlayers(availableTeamPlayers);
      return availableTeamPlayers;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setFetchingAvailableTeamPlayersError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setFetchingAvailableTeamPlayers(false);
    }
  }, [tournamentId]);

  return {
    isFetchingAvailableTeamPlayers,
    fetchingAvailableTeamPlayersError,
    availableTeamPlayers,
    fetchAvailableTeamPlayers,
  };
}
