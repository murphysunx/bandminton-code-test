import { IPerson } from '../../player/interfaces';
import { MIN_PLAYERS } from './constants';

export function isReadyToStart(players: IPerson[]) {
  return players.length >= MIN_PLAYERS && players.length % 2 === 0;
}
