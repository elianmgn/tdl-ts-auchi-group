import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Transaction } from './model';

@Injectable()
export class TransactionService {
  constructor(private userService: UserService) {}

  async addUserTransaction(username: string, transaction: Transaction) {
    const user = await this.userService.findOneUserByUsername(username);
    return Transaction.create({
      ...transaction,
      userId: user.id,
    });
  }
}
