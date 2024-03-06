import { NoPasswordUser } from '@/users/users.types';

export class TokenResp {
  user: NoPasswordUser;
  token: {
    access_token: string;
    refresh_token: string;
  };
  expires: {
    access_token: number;
    refresh_token: number;
  };
}

export class TokenReq {
  username: string;
  sub: number;
  iat: number;
  exp: number;
  token: string;
}

export class Token {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}
