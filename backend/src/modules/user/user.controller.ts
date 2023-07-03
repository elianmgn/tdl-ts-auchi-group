import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('balance/:username')
  getUserBalance(
    @Param('username') username: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ): Promise<number> {
    return this.userService.getUserBalance(username, {
      dateFrom,
      dateTo,
    });
  }

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
