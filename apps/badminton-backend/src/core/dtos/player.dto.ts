import { CreatePlayerPayload } from '@libs/player/type';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto implements CreatePlayerPayload {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateGoalDto extends PartialType(CreatePlayerDto) {}
