import { Expose } from 'class-transformer';

/**
 * Player entity
 */
export class Player {
  @Expose()
  public readonly id;

  @Expose()
  public readonly name;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  equals(player: Player) {
    return this.id === player.id;
  }
}
