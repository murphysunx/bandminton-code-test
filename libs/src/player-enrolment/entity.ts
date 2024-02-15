import { Expose } from 'class-transformer';
import { Player } from '../player/entity';

export class PlayerEnrolment {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly tournamentId: number;

  @Expose()
  public readonly player: Player;

  constructor(id: number, tournamentId: number, player: Player) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.player = player;
  }
}
