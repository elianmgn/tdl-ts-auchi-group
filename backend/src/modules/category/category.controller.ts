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

  @Get()
  getCategories(
    @Query('name') name: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<Category[]> {
    return this.categoryService.getFilteredCategories({
      name,
      dateFrom,
      dateTo,
    });
  }

  @Post()
  addCategory(@Request() req) {
    const category = req.body;
    return this.categoryService.addCategory(category);
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
