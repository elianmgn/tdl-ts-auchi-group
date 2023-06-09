import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Transaction } from '../transaction/model';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ unique: true })
  username: string;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
