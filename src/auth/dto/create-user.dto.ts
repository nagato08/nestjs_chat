import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'firstName must be a string' })
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    type: String,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString({ message: 'lastName must be a string' })
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    type: String,
  })
  lastName: string;

  @IsNotEmpty()
  @IsString({ message: 'email must be a string' })
  @IsEmail(
    {
      blacklisted_chars: "!#$%&'*+/=?^_`{|}~ ",
    },
    { message: 'email must be a valid email address' },
  )
  @ApiProperty({
    example: 'tadjojeremie@gmail.com',
    description: 'The email of the user',
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  password: string;
}
