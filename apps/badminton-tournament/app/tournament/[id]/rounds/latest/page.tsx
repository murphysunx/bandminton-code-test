'use client';
import { useEffect } from 'react';
import { useGetLatestRounds } from '../../../../../features/tournament/core/hooks/get-latest-rounds';

export default function TournamentLatestRounds({
  params,
}: {
  params: { id: number };
}) {
  const { singleRound, doubleRound, getLatestRounds } = useGetLatestRounds(
    params.id
  );

  useEffect(() => {
    getLatestRounds();
  }, [getLatestRounds, params.id]);

  return (
    <div>
      <div>
        {singleRound?.matches?.map((match) => {
          return (
            <div key={match.id}>
              {match.player1.name} vs {match.player2.name}
            </div>
          );
        })}
      </div>
      <div>
        {doubleRound?.matches?.map((match) => {
          return (
            <div key={match.id}>
              {match.team1.player1.name + ' & ' + match.team1.player2.name} vs{' '}
              {match.team2.player1.name + ' & ' + match.team2.player2.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
