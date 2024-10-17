import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { HrSalary } from './entity/hr_salary.entity';
import { HrSalaryService } from './services/hr_salary.services';
import { HrSalaryController } from './controller/hr_salary.controller';
import { HrTimekeeping } from '../hr_salary/entity/hr_timekeeping.entity';
import { HrTimeKeepingController } from '../hr_salary/controller/hr_timekeeping.controller';
import { HrTimeKeepingServices } from './services/hr_timekeeping.services';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([HrSalary, HrTimekeeping]),
   
  ],
  providers: [HrSalaryService,HrTimeKeepingServices ],
  controllers: [HrSalaryController, HrTimeKeepingController],
  exports: [],
})
export class HrSalaryModule { }
