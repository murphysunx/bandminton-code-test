import { CreatePlayerPayload, IPlayer } from '@libs/player';
import { ENDPOINT } from '../../../../../core';
import { useState, useCallback } from 'react';

export function useRegisterPlayer() {
  const [isRegisteringPlayer, setRegisteringPlayer] = useState<boolean>();
  const [registeringPlayerError, setRegisteringPlayerError] =
    useState<string>();
  const [player, setPlayer] = useState<IPlayer | null>();

  const registerPlayer = useCallback(async (payload: CreatePlayerPayload) => {
    setRegisteringPlayer(true);
    setRegisteringPlayerError(void 0);
    // setPlayer(null);
    try {
      const response = await fetch(`${ENDPOINT}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const player: IPlayer = await response.json();
      setPlayer(player);
      return player;
    } catch (e) {
      const error = e as Error;
      const errorMessage = error.message || 'Unknown error';
      setRegisteringPlayerError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setRegisteringPlayer(false);
    }
  }, []);

  return {
    isRegisteringPlayer,
    registeringPlayerError,
    player,
    registerPlayer,
  };
}
