import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';

import { UserService } from './user.service';
import { Users } from './user.entity';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Users])],
  controllers: [AppController],
  providers: [AppService, UserService],
  exports: [UserService, AppService],
})
export class AuthModule {}
