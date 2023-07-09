import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CategoryController],
  imports: [UserModule],
  providers: [CategoryService],
})
export class CategoryModule {}
