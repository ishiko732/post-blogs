import { ExecutionContext } from '@nestjs/common';

export function getRequest(ctx: ExecutionContext) {
  let request;
  if (ctx.getType<string>() === 'graphql') {
    const gqlCtx = ctx.getArgByIndex(2);
    request = gqlCtx.req;
  } else {
    request = ctx.switchToHttp().getRequest();
  }
  return request;
}
