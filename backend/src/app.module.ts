import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [UserModule, TransactionModule, CategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
