import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Transaction } from './model';
import { User } from '../user/model';

@Injectable()
export class TransactionService {
  constructor(private userService: UserService) {}

  async getUserTransactions(username: string): Promise<Transaction[]> {
    const userWithId = await this.userService.findOneUserByUsername(username);
    const user: User = await User.findByPk(userWithId.id, {
      include: [
        {
          model: Transaction,
          as: 'transactions',
          required: false,
        },
      ],
    });
    return user.transactions;
  }

  async addUserTransaction(username: string, transaction: Transaction) {
    const user = await this.userService.findOneUserByUsername(username);
    return Transaction.create({
      ...transaction,
      userId: user.id,
    });
  }
}
