import { CreateTournamentPayload } from '@libs/tournament/type';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTournamentDto implements CreateTournamentPayload {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {}
