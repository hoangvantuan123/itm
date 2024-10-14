import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { HrSalary } from './entity/hr_salary.entity';
import { HrSalaryService } from './services/hr_salary.services';
import { HrSalaryController } from './controller/hr_salary.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([HrSalary]),
   
  ],
  providers: [HrSalaryService],
  controllers: [HrSalaryController],
  exports: [],
})
export class HrSalaryModule { }
