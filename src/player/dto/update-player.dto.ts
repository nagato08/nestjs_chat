import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the player',
    type: String,
  })
  @IsString({ message: 'firstName must be a string' })
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the player',
    type: String,
  })
  @IsString({ message: 'lastName must be a string' })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the team',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  teamId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the position',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  positionId: number;
}
