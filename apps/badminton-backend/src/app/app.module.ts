import { Module } from '@nestjs/common';

import { PlayerModule } from '../features/player/player.module';
import { TournamentModule } from '../features/tournament/tournament.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TournamentModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
