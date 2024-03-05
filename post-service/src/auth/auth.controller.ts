import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/users/users.types';
import { Public } from '@/lib/metaData/public';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @Public()
  signIn(@Body() signInDto: LoginUserDto, resp: Response) {
    return this.authService.signIn(
      signInDto.username,
      signInDto.password,
      resp,
    );
  }

  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}