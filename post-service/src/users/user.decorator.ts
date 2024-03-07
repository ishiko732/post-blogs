import { ExecutionContext } from '@nestjs/common';
import { TokenReq } from '@/auth/auth.types';
import { createParamDecoratorWithInjections } from '@/lib/metaData/DecorationWithInjects';
import { UsersService } from './users.service';

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
