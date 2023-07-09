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
import { CategoryService } from './category.service';
import { Category } from './model';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':username')
  getFilteredUserCategories(
    @Param('username') username: string,
    @Query('name') name: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<Category[]> {
    return this.categoryService.getFilteredUserCategories(username, {
      name,
      dateFrom,
      dateTo,
    });
  }

  @Get('transaction-summary')
  async getTransactionSummaryByCategory(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<any> {
    const categoriesSummaryMap =
      await this.categoryService.getTransactionSummaryByCategory({
        dateFrom,
        dateTo,
      });

    const categoriesSummaryJson = {};

    categoriesSummaryMap.forEach((value, key) => {
      categoriesSummaryJson[key] = value;
    });

    return JSON.stringify(categoriesSummaryJson);
  }

  @Post(':username')
  addUserCategory(@Param('username') username: string, @Request() req) {
    const category = req.body;
    return this.categoryService.addUserCategory(username, category);
  }

  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() category) {
    console.log('update category');
    console.log(category);
    return this.categoryService.updateCategory(category, id);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: number) {
    return this.categoryService.removeCategory(id);
  }
}
