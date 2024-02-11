import {
  CreateDoubleMatchPayload,
  CreateSingleMatchPayload,
} from '@libs/match/type';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSingleMatchDto implements CreateSingleMatchPayload {
  @IsInt()
  @IsNotEmpty()
  roundId: number;
  @IsInt()
  @IsNotEmpty()
  player1Id: number;
  @IsInt()
  @IsNotEmpty()
  player2Id: number;
}

export class CreateDoubleMatchDto implements CreateDoubleMatchPayload {
  @IsInt()
  @IsNotEmpty()
  roundId: number;
  @IsInt()
  @IsNotEmpty()
  team1Id: number;
  @IsInt()
  @IsNotEmpty()
  team2Id: number;
}
