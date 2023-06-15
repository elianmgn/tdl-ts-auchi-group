import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './model';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':username')
  getFilteredUserTransactions(
    @Param('username') username: string,
    @Query('type') type: string,
    @Query('category') category: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('description') description: string,
    @Query('paymentMethod') paymentMethod: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getFilteredUserTransactions(username, {
      type,
      category,
      dateFrom,
      dateTo,
      description,
      paymentMethod,
    });
  }

  @Post(':username')
  addUserTransaction(@Param('username') username: string, @Request() req) {
    const transaction = req.body;
    transaction['paymentMethod'] = transaction.payment_method;
    return this.transactionService.addUserTransaction(username, transaction);
  }

  @Put(':id')
  updateUserTransaction(@Param('id') id: number, @Body() transaction) {
    transaction['paymentMethod'] = transaction.payment_method;
    return this.transactionService.updateUserTransaction(transaction, id);
  }

  @Delete(':id')
  removeUserTransaction(@Param('id') id: number) {
    return this.transactionService.removeUserTransaction(id);
  }
}
