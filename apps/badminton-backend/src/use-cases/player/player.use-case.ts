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
    return this.playerRepository.create({ name });
  }

  /**
   * get player by id
   * @param id id
   * @returns player with the given id
   */
  async getById(id: number) {
    return this.playerRepository.getById(id);
  }

  /**
   * get all players
   * @returns all players
   */
  async getAll() {
    return this.playerRepository.getAll();
  }
}
