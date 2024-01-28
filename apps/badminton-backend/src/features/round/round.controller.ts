import { IRankable } from '@libs/player';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoundService } from './round.service';

@Controller('round')
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @Post('rank')
  rank(@Body() rankables: IRankable[]) {
    return this.roundService.rank(rankables);
  }

  @Post('next')
  next(@Body() rankables: IRankable[]) {
    return this.roundService.generateNextRound(rankables);
  }

  @Get()
  getHello(): string {
    return 'Hello Round!';
  }
}
