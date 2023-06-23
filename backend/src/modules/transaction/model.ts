import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/model';
import { Category } from '../category/model';

@Table({ tableName: 'Transaction' })
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @Column
  description: string;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  categoryId: number;

  @Column
  amount: number;

  @Column
  date: Date;

  @Column
  type: string;

  @Column({ field: 'payment_method' })
  paymentMethod: string;

  @BelongsTo(() => User)
  addedByUser: User;

  @BelongsTo(() => Category)
  category: Category;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}

export type UpdateTransactionDto = {
  description: string;

  categoryId: number;

  amount: number;

  date: Date;

  type: string;

  paymentMethod: string;
};
