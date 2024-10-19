import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { HrTimekeeping } from '../hr_salary/entity/hr_timekeeping.entity';
import { HrTimeKeepingController } from '../hr_salary/controller/hr_timekeeping.controller';
import { HrTimeKeepingServices } from './services/hr_timekeeping.services';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([HrTimekeeping]),

  ],
  providers: [HrTimeKeepingServices],
  controllers: [HrTimeKeepingController],
  exports: [],
})
export class HrSalaryModule { }
