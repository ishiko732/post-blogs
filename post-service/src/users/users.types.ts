import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NoPasswordUser {
  userId: number;
  username: string;
}

export class User extends NoPasswordUser {
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ required: true, example: 'john' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ required: true, example: 'changeme' })
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  email: string;
}
