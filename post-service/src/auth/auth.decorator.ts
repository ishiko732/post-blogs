import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenReq } from './auth.types';
import { getRequest } from '@/lib/getRequest';

export const TokenAbstract = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    return request['user'] ? (request['user'] as TokenReq) : null;
  },
);

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    const token = request?.cookies['refresh_token'];
    return token ? (token as string) : null;
  },
);

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = getRequest(ctx);
    if (!data) {
      return request?.cookies;
    }
    return request?.cookies['refresh_token'];
  },
);
