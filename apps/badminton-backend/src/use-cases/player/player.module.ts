import { Module } from '@nestjs/common';
import { PlayerRepositoryModule } from '../../repositories/player/player.module';
import { PlayerUseCases } from './player.use-case';

@Module({
  providers: [PlayerUseCases],
  exports: [PlayerUseCases],
  imports: [PlayerRepositoryModule],
})
export class PlayerUseCasesModule {}
