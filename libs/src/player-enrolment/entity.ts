import { Player } from '../player/entity';

export class PlayerEnrolment {
  constructor(
    public readonly id: number,
    public readonly tournamentId: number,
    public readonly player: Player
  ) {}
}
