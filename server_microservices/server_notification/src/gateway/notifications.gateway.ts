import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RedisService } from '../utils/redis.util';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly redisService: RedisService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Lưu socketId vào Redis
    this.redisService.saveSocketId(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Xóa socketId khi client ngắt kết nối
    this.redisService.removeSocketId(client.id);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): string {
    console.log(`Received event from ${client.id}:`, data);
    return 'Event received!';
  }

  sendNotificationToClient(client: Socket, data: any) {
    client.emit('notification', data);  // Gửi thông báo đến client
  }
}
