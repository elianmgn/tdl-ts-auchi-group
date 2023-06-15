import { Injectable } from '@nestjs/common';
import { User } from './model';
import { Op } from 'sequelize';
import { Transaction } from '../transaction/model';

@Injectable()
export class UserService {
  async findOneUserByUsername(username: string): Promise<User | undefined> {
    return await User.findOne({ where: { username: username } });
  }

  async getUserBalance(
    username: string,
    filters: {
      dateFrom?: string;
      dateTo?: string;
    },
  ): Promise<number> {
    const userWithId = await this.findOneUserByUsername(username);
    const where: any = { userId: userWithId.id };

    if (filters.dateFrom && filters.dateTo) {
      where.date = {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      };
    }

    const incomeTransactionsFilter = { ...where };
    incomeTransactionsFilter.type = 'INCOME';
    const expenseTransactionsFilter = { ...where };
    expenseTransactionsFilter.type = 'EXPENSE';

    const incomeTransactions = await Transaction.findAll({
      where: incomeTransactionsFilter,
    });
    const expenseTransactions = await Transaction.findAll({
      where: expenseTransactionsFilter,
    });

    const totalIncome = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const totalExpense = expenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const balance = totalIncome - totalExpense;

    return balance;
  }
}
