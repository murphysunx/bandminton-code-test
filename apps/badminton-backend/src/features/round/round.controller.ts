import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundResult } from './core';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post('rank')
  rank(@Body() roundResults: RoundResult[]) {
    return this.roundService.rank(roundResults);
  }

  @Post('next')
  next(@Body() roundResults: RoundResult[]) {
    return this.roundService.generateNextRound(roundResults);
  }

  @Get()
  getHello(): string {
    return 'Hello Round!';
  }
}
