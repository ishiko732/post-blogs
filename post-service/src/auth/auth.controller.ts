import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, User } from '@/users/users.types';
import { Public } from '@/lib/metaData/public';
import { Response as ExpressResponse } from 'express';
import { TokenAbstract, UserEntity } from '@/users/user.decorator';
import { TokenReq } from './auth.types';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @Public()
  async signIn(
    @Body() signInDto: LoginUserDto,
    @Response() resp: ExpressResponse,
  ) {
    const data = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
      resp,
    );
    return resp.json(data);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ApiBearerAuth()
  // @UsePipes(TokenAbstractPipe)
  getProfile(@TokenAbstract() info: TokenReq, @UserEntity() user: User) {
    // console.log(info);
    console.log(user);
    return info;
  }
}
