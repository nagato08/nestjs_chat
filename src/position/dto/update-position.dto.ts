import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class updatePositionDto {
  @IsNotEmpty()
  @IsString({ message: 'Position name must be a string' })
  @Length(3, 50, {
    message: 'Position name must be between 3 and 50 characters',
  })
  @IsOptional()
  @ApiProperty({
    example: 'Goalkeeper',
    description: 'The name of the position',
    minLength: 3,
    maxLength: 50,
  })
  name: string;
}
