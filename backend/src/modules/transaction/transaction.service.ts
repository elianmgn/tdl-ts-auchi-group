import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Transaction } from './model';

@Injectable()
export class TransactionService {
  constructor(private userService: UserService) {}

  async addUserTransaction(username: string, transaction: Transaction) {
    const user = await this.userService.findOneUserByUsername(username);
    transaction.userId = user.id;
    return Transaction.create(transaction);
  }
}
