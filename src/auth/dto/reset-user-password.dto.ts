import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetUserPasswordDto {
  @IsString({ message: 'token must be a string' })
  token: string;

  @IsNotEmpty()
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  password: string;
}
