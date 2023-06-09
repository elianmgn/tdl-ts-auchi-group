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

@Table({ tableName: 'Hero' })
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

  @Column
  category: string;

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

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
