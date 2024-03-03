import { Injectable } from '@nestjs/common';
import { User } from './users.types';

@Injectable()
export class UsersService {
  private readonly users: User[];
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
