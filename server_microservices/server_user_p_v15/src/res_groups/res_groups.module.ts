import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResGroupsController } from './controller/res_groups.controller';
import { ResGroupsService } from './services/res_groups.service';
import { ResGroups } from './entity/res_groups.entity';
import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { ResUserGroupsController } from './controller/res_user_groups.controller';
import { ResUserGroups } from './entity/res_user_groups.entity';
import { ResUserGroupsService } from './services/res_user_groups.services';
import { Users } from 'src/auth/user.entity';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature([ResGroups, ResUserGroups, Users]),
  ],
  controllers: [ResGroupsController, ResUserGroupsController],
  providers: [ResGroupsService, ResUserGroupsService],
})
export class ResGroupsModule {}
