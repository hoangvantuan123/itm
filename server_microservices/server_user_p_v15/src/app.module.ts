import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ResGroupsModule } from './res_groups/res_groups.module';
import { ResUsersModule } from './users/users.module';
import { MenuModule } from './ui_menu/ui_menu.module';
import { TableModule } from './table/table.module';
import { HrEmployeeModule } from './hr/hr_employee.module';
import * as cors from 'cors';
import { HealthController } from './health.controller';
@Module({
  imports: [AuthModule, ResGroupsModule, ResUsersModule, MenuModule, TableModule, HrEmployeeModule],
  providers: [],
  controllers: [HealthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
