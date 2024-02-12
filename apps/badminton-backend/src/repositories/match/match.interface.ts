import { MatchUnit } from "@libs/match/entity";
import { Round } from "@libs/round/entity";

export interface MatchRepoCreate<U extends MatchUnit> {
  round: Round<U>;
  unit1: U;
  unit2: U;
}

export interface MatchRepoQuery {
  roundId?: number;
}
