import { IRankable } from '@libs/player';
import { Injectable } from '@nestjs/common';
import { pairForNextRound, rank } from './core';

@Injectable()
export class RoundService {
  generateNextRound(history: IRankable[]) {
    return pairForNextRound<IRankable>(history);
  }

  rank(history: IRankable[]) {
    return rank<IRankable>(history);
  }
}
