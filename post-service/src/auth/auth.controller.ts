import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterDto, User } from '@/users/users.types';
import { Public } from '@/lib/metaData/public';
import { Response as ExpressResponse, Request } from 'express';
import {
  Cookies,
  RefreshToken,
  TokenAbstract,
  UserEntity,
} from '@/users/user.decorator';
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
  @Get('register')
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
    @Cookies('refresh_token') _token: string,
    @RefreshToken() token: string,
    @Req() req: Request,
    @Response() resp: ExpressResponse,
  ) {
    console.log(_token);
    console.log(token);
    const data = await this.authService.refreshToken(token, resp);
    return resp.json(data);
  }
}
