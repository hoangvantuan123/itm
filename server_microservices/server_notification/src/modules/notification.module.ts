import { Module } from '@nestjs/common';
import { NotificationsGateway } from '../gateway/notifications.gateway';
import { NotificationService } from '../services/notification.service';
import { RedisService } from '../utils/redis.util';

@Module({
  providers: [NotificationsGateway, NotificationService, RedisService],
})
export class NotificationModule {}
