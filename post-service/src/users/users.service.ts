import { Injectable } from '@nestjs/common';
import { RegisterDto, User } from './users.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: User[];
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: bcrypt.hash('changeme', 10),
      },
      {
        userId: 2,
        username: 'maria',
        password: bcrypt.hash('guess', 10),
      },
    ];
  }

  async findOne(username: string) {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      return {
        ...user,
        password: await user.password,
      };
    }
    return null;
  }

  async create(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user: User = {
      userId: this.users.length + 1,
      ...registerDto,
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }
}
