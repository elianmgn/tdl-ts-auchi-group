import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

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
  addUserTransaction(@Param('username') username: string, @Request() req) {
    const transaction = req.body;
    transaction['paymentMethod'] = transaction.payment_method;
    return this.transactionService.addUserTransaction(username, transaction);
  }
}
