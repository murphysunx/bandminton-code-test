/**
 * Player entity
 */
export class Player {
  constructor(public readonly id: number, public readonly name: string) {}

  equals(player: Player) {
    return this.id === player.id;
  }
}
