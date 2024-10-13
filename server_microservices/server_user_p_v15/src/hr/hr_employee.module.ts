import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { HrEmployeeEntity } from './entity/hr_employee.entity';
import { HrEmployeeController } from './controller/hr_employee.controller';
import { HrEmployeeService } from './services/hr_employee.services';
import { DepartmentEntity } from './entity/hr_department.entity';
import { HrDepartmentController } from './controller/hr_department.controller';
import { HrDepartmentService } from './services/hr_department.services';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature([HrEmployeeEntity, DepartmentEntity]),
  ],
  providers: [HrEmployeeService, HrDepartmentService],
  controllers: [HrEmployeeController, HrDepartmentController],
  exports: [HrEmployeeService],
})
export class HrEmployeeModule {}
