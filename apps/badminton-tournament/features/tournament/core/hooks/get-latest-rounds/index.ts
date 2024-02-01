import { IDoubleMatch, ISingleMatch } from '@libs/match';
import { TournamentRound } from '@libs/round';
import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';

export function useGetLatestRounds(tournamentId: number) {
  const [singleRound, setSingleRound] =
    useState<TournamentRound<ISingleMatch> | null>();
  const [doubleRound, setDoubleRound] =
    useState<TournamentRound<IDoubleMatch> | null>();
  const [isLoadingLatestRounds, setIsLoadingLatestRounds] = useState<boolean>();
  const [errorLoadingLatestRounds, setErrorLoadingLatestRounds] =
    useState<string>();

  const getLatestRounds = useCallback(async () => {
    setIsLoadingLatestRounds(true);
    setErrorLoadingLatestRounds(undefined);
    try {
      const singleRound = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/single-rounds/latest`
      );
      setSingleRound(await singleRound.json());
      const doubleRound = await fetch(
        `${ENDPOINT}/tournaments/${tournamentId}/double-rounds/latest`
      );
      setDoubleRound(await doubleRound.json());
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
