import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenReq } from '@/auth/auth.types';
import { createParamDecoratorWithInjections } from '@/lib/metaData/DecorationWithInjects';
import { UsersService } from './users.service';

export const TokenAbstract = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'] ? (request['user'] as TokenReq) : null;
  },
);

export const UserEntity = createParamDecoratorWithInjections(
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
