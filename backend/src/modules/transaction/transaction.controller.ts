import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './model';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':username')
  addUserTransaction(
    @Param('username') username: string,
    @Body() transaction: Transaction,
  ) {
    return this.transactionService.addUserTransaction(username, transaction);
  }
}
