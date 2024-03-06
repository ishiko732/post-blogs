import { UsersService } from '@/users/users.service';
import { NoPasswordUser, RegisterDto } from '@/users/users.types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { TokenResp } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(
    username: string,
    pass: string,
    response: Response,
  ): Promise<TokenResp> {
    const user = await this.validateUser(username, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.issueTokens(user, response);
  }

  async register(registerDto: RegisterDto, response: Response) {
    const existingUser = await this.usersService.findOne(registerDto.username);
    if (existingUser) {
      throw new BadRequestException({ email: 'Email already in use' });
    }
    const user = await this.usersService.create(registerDto);

    return this.issueTokens(user, response);
  }

  private async issueTokens(
    user: NoPasswordUser,
    response: Response,
  ): Promise<TokenResp> {
    const payload = { username: user.username, sub: user.userId };

    const now = new Date();
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '1d', //'300s',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });
    return {
      user,
      token: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      expires: {
        access_token: now.getTime() + 300 * 1000,
        refresh_token: now.getTime() + 7 * 24 * 60 * 60 * 1000,
      },
    };
  }

  async validateUser(
    username: string,
    pass: string,
  ): Promise<NoPasswordUser | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const userExists = await this.usersService.findOne(payload.username);
    if (!userExists) {
      throw new BadRequestException('User no longer exists');
    }

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    res.cookie('access_token', accessToken, { httpOnly: true });

    return accessToken;
  }

  async logout(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return 'Successfully logged out';
  }
}
