import { Expose } from 'class-transformer';
import { Player } from '../player/entity';

export class PlayerEnrolment {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly tournamentId: number;

  @Expose()
  public readonly playerId: number;

  #player?: Player;

  @Expose()
  get player() {
    return this.#player;
  }

  constructor(id: number, tournamentId: number, playerId: number) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.playerId = playerId;
  }
}
