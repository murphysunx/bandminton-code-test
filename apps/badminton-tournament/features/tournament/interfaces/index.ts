import { IPerson } from '../../player/interfaces/index';
import { IRound } from '../../round/interfaces';

interface ITournament {
  players: IPerson[];
  rounds: IRound;
}
