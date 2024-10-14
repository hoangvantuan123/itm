import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import { HrRecruitment } from './hr_recruitment/hr_recruitment.module';
import { HealthController } from './health.controller';
import { HrSalaryModule } from './hr_salary/hr_salary.module';
@Module({
  imports: [HrRecruitment, HrSalaryModule],
  providers: [],
  controllers: [HealthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
