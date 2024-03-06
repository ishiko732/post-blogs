import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenReq } from '@/auth/auth.types';
import { createParamDecoratorWithInjections } from '@/lib/metaData/DecorationWithInjects';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';
export const TokenAbstract = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'] ? (request['user'] as TokenReq) : null;
  },
);

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request?.cookies['refresh_token'];
    return token ? (token as string) : null;
  },
);

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: ExpressRequest = ctx.switchToHttp().getRequest();
    console.log(data);
    if (!data) {
      return request.cookies;
    }
    return request?.cookies['refresh_token'];
  },
);

export const LoginUser = createParamDecoratorWithInjections(
  async (
    data: unknown,
    ctx: ExecutionContext,
    services: { user: UsersService },
  ) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request['user']) {
      return null;
    }
    const userToken = request['user'] as TokenReq;
    return await services.user.findOne(userToken.username);
  },
  { user: UsersService },
);

export const UserEntity = createParamDecoratorWithInjections(
  async (
    data: number,
    ctx: ExecutionContext,
    services: { user: UsersService },
  ) => {
    if (!data || (data as unknown) instanceof Object) {
      return null;
    }
    return await services.user.findById(data);
  },
  { user: UsersService },
);
