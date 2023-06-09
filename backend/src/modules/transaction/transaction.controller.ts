import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './model';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':username')
  getUserTransactions(
    @Param('username') username: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getUserTransactions(username);
  }

  @Post(':username')
  addUserTransaction(
    @Param('username') username: string,
    @Body() transaction: Transaction,
  ) {
    return this.transactionService.addUserTransaction(username, transaction);
  }
}
