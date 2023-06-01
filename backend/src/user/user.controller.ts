import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() user: User): Promise<any> {
    return this.userService.create(user);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() user: User): Promise<any> {
    user.id = Number(id);
    return this.userService.update(user);
  }
}
