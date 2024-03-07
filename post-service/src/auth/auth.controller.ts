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
import { LoginUserDto, RegisterDto, User } from '@/users/users.types';
import { Public } from '@/lib/metaData/public';
import { Response as ExpressResponse } from 'express';
import { LoginUser } from '@users/user.decorator';
import { RefreshToken, TokenAbstract } from '@auth/auth.decorator';
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
  getProfile(@TokenAbstract() info: TokenReq, @LoginUser() user: User) {
    // console.log(info);
    console.log(user);
    return info;
  }
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @Public()
  async register(
    @Body() registerDto: RegisterDto,
    @Response() resp: ExpressResponse,
  ) {
    const data = await this.authService.register(registerDto, resp);
    return resp.json(data);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Refresh' })
  @Public()
  async refresh(
    // @Cookies('refresh_token') _token: string,
    @RefreshToken() token: string,
    // @Req() req: Request,
    @Response() resp: ExpressResponse,
  ) {
    const data = await this.authService.refreshToken(token, resp);
    return resp.json(data);
  }

  @Get('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  async logout(@Response() resp: ExpressResponse) {
    const data = await this.authService.logout(resp);
    return resp.json(data);
  }
}
