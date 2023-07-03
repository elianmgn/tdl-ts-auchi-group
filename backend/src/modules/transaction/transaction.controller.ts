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
import { CategoryService } from '../category/category.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get(':username')
  async getFilteredUserTransactions(
    @Param('username') username: string,
    @Query('type') type: string,
    @Query('categoryId') categoryId: number,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('description') description: string,
    @Query('paymentMethod') paymentMethod: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getFilteredUserTransactions(username, {
      type,
      categoryId,
      dateFrom,
      dateTo,
      description,
      paymentMethod,
    });
  }

  @Post(':username')
  async addUserTransaction(
    @Param('username') username: string,
    @Request() req,
  ) {
    const transaction = req.body;
    const categoryId = parseInt(transaction.category);
    transaction['categoryId'] = parseInt(transaction.category);
    transaction['category'] = await this.categoryService.findCategoryById(
      categoryId,
    );
    transaction['paymentMethod'] = transaction.paymentMethod;
    return this.transactionService.addUserTransaction(username, transaction);
  }

  @Put(':id')
  updateUserTransaction(@Param('id') id: number, @Body() transaction) {
    transaction['paymentMethod'] = transaction.paymentMethod;
    return this.transactionService.updateUserTransaction(transaction, id);
  }

  @Delete(':id')
  removeUserTransaction(@Param('id') id: number) {
    return this.transactionService.removeUserTransaction(id);
  }
}
