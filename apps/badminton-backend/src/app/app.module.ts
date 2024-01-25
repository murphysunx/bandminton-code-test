import { Module } from '@nestjs/common';

import { RoundModule } from '../features/round/round.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RoundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
