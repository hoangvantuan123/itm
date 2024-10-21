import { Module } from '@nestjs/common';
import { NotificationModule } from './notification.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NotificationModule,
    ScheduleModule.forRoot(),  // Để chạy cron job
  ],
})
export class AppModule {}
