import { Injectable } from '@nestjs/common';
import { Category, UpdateCategoryDto } from './model';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  async findCategoryById(id: number) {
    return Category.findByPk(id);
  }

  async getFilteredCategories(filters: {
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Category[]> {
    const where: any = {};

    if (filters.dateFrom && filters.dateTo) {
      where.date = {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      };
    }

    const categories = await Category.findAll({
      where,
    });

    return categories;
  }

  async addCategory(category: Category) {
    return Category.create({
      ...category,
    });
  }

  async updateCategory(category: UpdateCategoryDto, id: number) {
    return Category.update(
      {
        name: category.name,
        description: category.description,
      },
      { where: { id: id } },
    );
  }

  async removeCategory(id: number) {
    return Category.destroy({ where: { id: id } });
  }
}
