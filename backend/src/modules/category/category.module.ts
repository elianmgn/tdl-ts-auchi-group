import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  imports: [],
  providers: [CategoryService],
})
export class CategoryModule {}
