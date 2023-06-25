import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/model';
import { Transaction, UpdateTransactionDto } from './model';
import { Op } from 'sequelize';
import { Category } from '../category/model';

@Injectable()
export class TransactionService {
  constructor(private userService: UserService) {}

  async getFilteredUserTransactions(
    username: string,
    filters: {
      type?: string;
      categoryId?: number;
      dateFrom?: string;
      dateTo?: string;
      description?: string;
      paymentMethod?: string;
    },
  ): Promise<Transaction[]> {
    const userWithId = await this.userService.findOneUserByUsername(username);
    const where: any = { userId: userWithId.id };

    if (filters.type && filters.type != 'ALL') {
      where.type = filters.type;
    }
    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }
    if (filters.dateFrom && filters.dateTo) {
      where.date = {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      };
    }
    if (filters.description) {
      where.description = filters.description;
    }
    console.log(filters.paymentMethod);
    console.log(filters);

    if (filters.paymentMethod && filters.paymentMethod != 'ALL') {
      where.paymentMethod = filters.paymentMethod;
    }

    console.log(filters.paymentMethod);
    console.log(filters);

    const transactions = await Transaction.findAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          required: false,
        },
      ],
    });

    return transactions;
  }

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
        categoryId: transaction.categoryId,
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
