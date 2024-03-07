import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenReq } from './auth.types';
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
