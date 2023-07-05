import { Injectable } from '@nestjs/common';
import { Category, UpdateCategoryDto } from './model';
import { Op } from 'sequelize';
import { Transaction } from '../transaction/model';

@Injectable()
export class CategoryService {
  async findCategoryById(id: number) {
    return Category.findByPk(id);
  }

  async getFilteredCategories(filters: {
    name?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Category[]> {
    const where: any = {};

    if (filters.name) {
      where.name = {
        [Op.iRegexp]: filters.name,
      };
    }
    if (filters.dateFrom && filters.dateTo) {
      where.createdAt = {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      };
    } else if (filters.dateFrom) {
      where.date = {
        [Op.gte]: filters.dateFrom,
      };
    } else if (filters.dateTo) {
      where.date = {
        [Op.lte]: filters.dateTo,
      };
    }

    const categories = await Category.findAll({
      where,
    });

    return categories;
  }

  async getTransactionSummaryByCategory(filters: {
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Map<string, { amount: number; balance: number }>> {
    const where: any = {};

    if (filters.dateFrom && filters.dateTo) {
      where.createdAt = {
        [Op.between]: [filters.dateFrom, filters.dateTo],
      };
    } else if (filters.dateFrom) {
      where.createdAt = {
        [Op.gte]: filters.dateFrom,
      };
    } else if (filters.dateTo) {
      where.createdAt = {
        [Op.lte]: filters.dateTo,
      };
    }

    const categories = await Category.findAll({
      where,
      include: [
        {
          model: Transaction,
          as: 'transactions',
          required: false,
        },
      ],
    });

    const categoriesSummary = new Map<
      string,
      {
        amount: number;
        balance: number;
        description: string;
        icon: string;
        color: string;
      }
    >();

    for (const category of categories) {
      let balance = 0;
      for (const categoryTransaction of category.transactions) {
        if (categoryTransaction.type == 'INCOME') {
          balance += categoryTransaction.amount;
        } else {
          balance -= categoryTransaction.amount;
        }
      }
      categoriesSummary.set(category.name, {
        amount: category.transactions.length,
        balance,
        description: category.description,
        icon: category.icon,
        color: category.color,
      });
    }

    return categoriesSummary;
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
        icon: category.icon,
        color: category.color,
      },
      { where: { id: id } },
    );
  }

  async removeCategory(id: number) {
    return Category.destroy({ where: { id: id } });
  }
}
