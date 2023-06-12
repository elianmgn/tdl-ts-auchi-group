import { Injectable } from '@nestjs/common';
import { User } from './model';

@Injectable()
export class UserService {
  async findOneUserByUsername(username: string): Promise<User | undefined> {
    return await User.findOne({ where: { username: username } });
  }
}
