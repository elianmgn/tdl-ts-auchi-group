import { Controller, Param, Post, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':username')
  addUserTransaction(@Param('username') username: string, @Request() req) {
    const transaction = req.body;
    transaction['paymentMethod'] = transaction.payment_method;
    return this.transactionService.addUserTransaction(username, transaction);
  }
}
