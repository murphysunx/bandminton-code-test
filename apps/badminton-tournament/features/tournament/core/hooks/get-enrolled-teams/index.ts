import { useCallback, useState } from 'react';
import { ENDPOINT } from '../../../../../core';
import { TournamentTeam } from '@libs/team';

export function useGetEnrolledTeams(id: number) {
  const [isFetchingEnrolledTeams, setFetchingEnrolledTeams] =
    useState<boolean>();
  const [fetchingEnrolledTeamsError, setFetchingEnrolledTeamsError] =
    useState<string>();
  const [enrolledTeams, setEnrolledTeams] = useState<TournamentTeam[] | null>();

  const fetchEnrolledTeams = useCallback(async () => {
    setFetchingEnrolledTeams(true);
    setFetchingEnrolledTeamsError(void 0);
    // setTeams(null);
    try {
      const response = await fetch(
        `${ENDPOINT}/tournaments/${id}/team-enrollments`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const teams: TournamentTeam[] = await response.json();
      setEnrolledTeams(teams);
      return teams;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setFetchingEnrolledTeamsError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setFetchingEnrolledTeams(false);
    }
  }, [id]);

  return {
    isFetchingEnrolledTeams,
    fetchingEnrolledTeamsError,
    enrolledTeams,
    fetchEnrolledTeams,
  };
}
