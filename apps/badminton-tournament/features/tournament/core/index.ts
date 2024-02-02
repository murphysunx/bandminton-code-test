import { IRankable } from '@libs/player/index';
import { RoundMatch } from '@libs/round';
import { ENDPOINT } from '../../../core';
import { useState } from 'react';

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

  return {
    isFetching,
    error,
    getNextRound: async (rankables: IRankable[]) => {
      setFetching(true);
      try {
        const response = await getNextRound(rankables);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const matches: RoundMatch[] = await response.json();
        return matches;
      } catch (e) {
        const error = e as Error;
        setError(error.message || 'Unknown error');
        return null;
      } finally {
        setFetching(false);
      }
    },
  };
}
