import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [HealthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
