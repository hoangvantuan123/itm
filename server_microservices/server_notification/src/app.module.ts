import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import { HealthController } from './health.controller';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  providers: [NotificationsGateway, RedisService ],
  controllers: [HealthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
