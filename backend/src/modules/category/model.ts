import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Transaction } from '../transaction/model';

@Table({ tableName: 'Category' })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  description: string;

  @Column({ unique: true })
  name: string;

  @Column
  type: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}

export type UpdateCategoryDto = {
  name: string;

  description: string;

  type: string;
};
