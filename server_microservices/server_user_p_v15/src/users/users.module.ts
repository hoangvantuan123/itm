import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResUsersController } from './users.controller';
import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersPermissionsService } from './user_permissions.services';
import { IrUiMenu } from 'src/ui_menu/entity/ui_menu.entity';
import { PermissionsMenu } from 'src/ui_menu/entity/permissions_menu.entity';
import { ResGroups } from 'src/res_groups/entity/res_groups.entity';
import { UsersPermissionsController } from './user_permissions.controller';
import { Users } from 'src/auth/user.entity';
import { ResUserGroups } from 'src/res_groups/entity/res_user_groups.entity';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([IrUiMenu, PermissionsMenu, ResGroups, Users, ResUserGroups]),],
  controllers: [ResUsersController, UsersPermissionsController],
  providers: [UsersPermissionsService],
})
export class ResUsersModule {}
