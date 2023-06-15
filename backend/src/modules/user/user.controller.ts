import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

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
}
