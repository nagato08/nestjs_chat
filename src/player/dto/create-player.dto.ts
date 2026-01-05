import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the player',
    type: String,
  })
  @IsString({ message: 'firstName must be a string' })
  @IsNotEmpty()
  @Length(3, 50, { message: 'firstName must be between 3 and 50 characters' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the player',
    type: String,
  })
  @IsString({ message: 'lastName must be a string' })
  @Length(3, 50, { message: 'lastName must be between 3 and 50 characters' })
  lastName: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the team',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  teamId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the position',
    type: Number,
  })
  @IsNumber()
  @IsPositive()
  positionId: number;
}
