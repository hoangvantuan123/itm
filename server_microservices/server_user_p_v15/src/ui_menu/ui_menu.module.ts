import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IrUiMenu } from './entity/ui_menu.entity';
import { MenuService } from './services/ui_menu.service';
import { PermissionsMenuService } from './services/permissions_menu.service';
import { MenuController } from './controller/ui_menu.controller';
import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsMenu } from './entity/permissions_menu.entity';
import { PermissionMenuController } from './controller/permissions_menu.controller';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature([IrUiMenu, PermissionsMenu]),
  ],
  providers: [MenuService, PermissionsMenuService],
  controllers: [MenuController, PermissionMenuController],
  exports: [],
})
export class MenuModule {}
