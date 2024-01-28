import { IRankable } from '@libs/player/index';
import { RoundMatch } from '@libs/round';
import { useState } from 'react';

const ENDPOINT = 'http://localhost:3000/api';

function getNextRound(rankables: IRankable[]) {
  return fetch(`${ENDPOINT}/round/next`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rankables),
  });
}

export function useNextRound() {
  const [isFetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<RoundMatch[] | null>(null);

  return {
    isFetching,
    error,
    matches,
    getNextRound: async (rankables: IRankable[]) => {
      setFetching(true);
      try {
        const response = await getNextRound(rankables);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setMatches(json);
      } catch (e) {
        const error = e as Error;
        setError(error.message || 'Unknown error');
      } finally {
        setFetching(false);
      }
    },
  };
}
