import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [TransactionController],
  imports: [UserModule],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
