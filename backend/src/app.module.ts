import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports:     [UserModule],
  controllers: [AppController],
  providers:   []
})
export class AppModule {}

