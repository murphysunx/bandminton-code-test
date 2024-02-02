import {
  TournamentDoubleRound,
  TournamentSingleRound
} from '@libs/round';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useGetLatestRounds(tournamentId: number) {
  const [singleRound, setSingleRound] =
    useState<TournamentSingleRound | null>();
  const [doubleRound, setDoubleRound] =
    useState<TournamentDoubleRound | null>();
  const [isLoadingLatestRounds, setIsLoadingLatestRounds] = useState<boolean>();
  const [errorLoadingLatestRounds, setErrorLoadingLatestRounds] =
    useState<string>();

  const getLatestRounds = useCallback(async () => {
    setIsLoadingLatestRounds(true);
    setErrorLoadingLatestRounds(undefined);
    try {
      const singleResponse = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/single-rounds/latest`
      );
      const singleRound: TournamentSingleRound = await singleResponse.json();
      setSingleRound(singleRound);
      const doubleResponse = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/double-rounds/latest`
      );
      const doubleRound: TournamentDoubleRound = await doubleResponse.json();
      setDoubleRound(doubleRound);
      return {
        singleRound,
        doubleRound,
      };
    } catch (e) {
      setErrorLoadingLatestRounds((e as Error).message);
    } finally {
      setIsLoadingLatestRounds(false);
    }
  }, [tournamentId]);

  return {
    singleRound,
    doubleRound,
    isLoadingLatestRounds,
    errorLoadingLatestRounds,
    getLatestRounds,
  };
}
