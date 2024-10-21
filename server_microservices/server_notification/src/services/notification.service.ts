import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationsGateway } from '../gateway/notifications.gateway';
import { RedisService } from '../utils/redis.util';

@Injectable()
export class NotificationService {
  constructor(
    private readonly gateway: NotificationsGateway,
    private readonly redisService: RedisService,
  ) {}

  @Cron('*/5 * * * * *')  // Cron job chạy mỗi 5 giây
  async checkDatabaseAndNotify() {
    const updates = await this.getUpdatesFromDB();
    updates.forEach(async (notification) => {
      const socketId = await this.redisService.getSocketId(notification.userId);
      if (socketId) {
        this.gateway.sendNotificationToClient(socketId, notification);
      }
    });
  }

  private async getUpdatesFromDB(): Promise<any[]> {
    // Logic kiểm tra dữ liệu mới từ DB
    return [{ userId: 'user123', message: 'New message for you!' }];
  }
}
