import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class User {
  userId: number;
  username: string;
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
