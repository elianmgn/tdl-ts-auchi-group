import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
}
