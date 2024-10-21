import { Module } from '@nestjs/common';
import { NotificationsGateway } from '../gateways/notifications.gateway';

@Module({
  providers: [NotificationsGateway], // Đăng ký NotificationsGateway
})
export class NotificationModule {}
