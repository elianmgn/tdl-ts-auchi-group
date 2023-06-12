import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Transaction, UpdateTransactionDto } from './model';

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

  async updateUserTransaction(transaction: UpdateTransactionDto, id: number) {
    return Transaction.update(
      {
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        paymentMethod: transaction.paymentMethod,
      },
      { where: { id: id } },
    );
  }

  async removeUserTransaction(id: number) {
    return Transaction.destroy({ where: { id: id } });
  }
}
