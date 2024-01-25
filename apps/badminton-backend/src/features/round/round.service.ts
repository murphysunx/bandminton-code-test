import { Injectable } from '@nestjs/common';
import { RoundGenerator, RoundResult } from './core';

@Injectable()
export class RoundService {
  generateNextRound(history: RoundResult[]) {
    const generator = new RoundGenerator([...history]);
    return generator.generateNextRound();
  }

  rank(history: RoundResult[]) {
    const generator = new RoundGenerator([...history]);
    return generator.rank();
  }
}
