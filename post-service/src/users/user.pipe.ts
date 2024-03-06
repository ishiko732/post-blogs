import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  Inject,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { TokenReq } from '@/auth/auth.types';

@Injectable({ scope: Scope.REQUEST })
export class TokenAbstractPipe implements PipeTransform {
  constructor(@Inject(REQUEST) protected readonly request: Request) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Request, _metadata: ArgumentMetadata) {
    return this.request['user'] ? (this.request['user'] as TokenReq) : null;
  }
}
