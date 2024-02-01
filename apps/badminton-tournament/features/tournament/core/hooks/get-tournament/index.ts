import { ITournament } from '@libs/tournament';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useGetTournament(id: number) {
  const [isFetchingTournament, setFetchingTournament] = useState<boolean>();
  const [fetchingTournamentError, setFetchingTournamentError] =
    useState<string>();
  const [tournament, setTournament] = useState<ITournament | null>();

  const fetchTournament = useCallback(async () => {
    setFetchingTournament(true);
    setFetchingTournamentError(void 0);
    setTournament(null);
    try {
      const response = await fetch(`${ENDPOINT}/tournaments/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const tournament: ITournament = await response.json();
      setTournament(tournament);
      return tournament;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setFetchingTournamentError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setFetchingTournament(false);
    }
  }, [id]);

  return {
    isFetchingTournament,
    fetchingTournamentError,
    tournament,
    fetchTournament,
  };
}
