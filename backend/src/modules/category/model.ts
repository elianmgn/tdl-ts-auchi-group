import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Transaction } from '../transaction/model';
import { User } from '../user/model';

@Table({ tableName: 'Category' })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @Column
  description: string;

  @Column
  name: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];

  @Column
  icon: string;

  @Column
  color: string;

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
  icon: string;
  color: string;
};
