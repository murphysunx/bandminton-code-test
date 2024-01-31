import { CreateTournamentPayload, ITournament } from '@libs/tournament';
import { ENDPOINT } from '../../../../../core/index';
import { useState } from 'react';

export function useCreateTournament() {
  const [isFetching, setFetching] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [tournament, setTournament] = useState<ITournament | null>();

  return {
    isFetching,
    error,
    tournament,
    createTournament: async (
      data: CreateTournamentPayload
    ): Promise<ITournament | null> => {
      setFetching(true);
      try {
        const response = await fetch(`${ENDPOINT}/tournament`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const tournament: ITournament = await response.json();
        setTournament(tournament);
        return tournament;
      } catch (e) {
        const error = e as Error;
        const errorMessage = error.message || 'Unknown error';
        setError(errorMessage);
        return null;
      } finally {
        setFetching(false);
      }
    },
  };
}
