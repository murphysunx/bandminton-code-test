import { Injectable } from '@nestjs/common';
import { pairForNextRound, rank } from './core';
import { IRankable } from '../player';

@Injectable()
export class RoundService {
  generateNextRound(history: IRankable[]) {
    return pairForNextRound<IRankable>(history);
  }

  rank(history: IRankable[]) {
    return rank<IRankable>(history);
  }
}
