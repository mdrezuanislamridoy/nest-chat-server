import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Value must be a string' })
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @ApiProperty({ example: 'john doe' })
  name: string;

  @IsEmail({}, { message: 'Value must be a valid email' })
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsString({ message: 'Value must be a string' })
  @MinLength(6, { message: 'Name length must be at least 3 character' })
  @IsNotEmpty({ message: 'Value cannot be empty' })
  @ApiProperty({ example: 'password123' })
  password: string;
}
