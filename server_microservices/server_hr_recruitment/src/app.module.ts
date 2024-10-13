import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import { HrRecruitment } from './hr_recruitment/hr_recruitment.module';
import { HealthController } from './health.controller';
@Module({
  imports: [HrRecruitment],
  providers: [],
  controllers: [HealthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
