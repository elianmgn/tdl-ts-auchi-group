import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { CreateUserDto, User } from './model';
import { Op } from 'sequelize';
import { Transaction } from '../transaction/model';

@Injectable()
export class UserService {
  async findOneUserByUsername(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username: username } });
  }

  async findOneUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email: email } });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { email, password } = userDto;

    const userInDb = await this.findOneUserByEmail(email);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const hashedUser = userDto;
    hashedUser.password = hashSync(password);
    return User.create(hashedUser);
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
    } else if (filters.dateFrom) {
      where.date = {
        [Op.gte]: filters.dateFrom,
      };
    } else if (filters.dateTo) {
      where.date = {
        [Op.lte]: filters.dateTo,
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
