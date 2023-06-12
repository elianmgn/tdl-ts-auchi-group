import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TransactionController],
  imports: [UserModule],
  providers: [TransactionService],
})
export class TransactionModule {}
