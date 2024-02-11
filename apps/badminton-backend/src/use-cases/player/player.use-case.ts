import { Injectable } from '@nestjs/common';
import { PlayerRepository } from '../../repositories/player/player.repository';

@Injectable()
export class PlayerUseCases {
  constructor(private readonly playerRepository: PlayerRepository) {}

  /**
   * create a new player
   * @param dto create player dto
   * @returns player
   */
  async create(name: string) {
    return this.playerRepository.create(name);
  }

  /**
   * get all players
   * @returns all players
   */
  async getAll() {
    return this.playerRepository.getAll();
  }
}
