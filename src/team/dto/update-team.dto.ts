/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTeamDto {
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  @Length(3, 50, { message: 'name must be between 3 and 50 characters' })
  @ApiProperty({ example: 'Team A', description: 'The name of the team',minLength: 3, maxLength: 50 })
  name: string;

  @IsString({ message: 'country must be a string' })
  @IsOptional()
  @Length(3, 50, { message: 'country must be between 3 and 50 characters' })
  @ApiProperty({ example: 'USA', description: 'The country of the team',minLength: 3, maxLength: 50 })
  country: string;
}
