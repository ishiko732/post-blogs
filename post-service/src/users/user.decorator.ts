import { ExecutionContext } from '@nestjs/common';
import { TokenReq } from '@/auth/auth.types';
import { createParamDecoratorWithInjections } from '@/lib/metaData/DecorationWithInjects';
import { UsersService } from './users.service';
import { getRequest } from '@/lib/getRequest';
import { User } from './users.types';

export const LoginUser = createParamDecoratorWithInjections(
  async (
    data: 'id' | 'username' | undefined,
    ctx: ExecutionContext,
    services: { user: UsersService },
  ) => {
    const request = getRequest(ctx);
    if (!request || !request['user']) {
      return null;
    }
    const userToken = request['user'] as TokenReq;
    if (data === 'id') {
      return Number(userToken.sub);
    } else if (data === 'username') {
      return userToken.username;
    } else {
      return (await services.user.findById(userToken.sub)) as User;
    }
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
