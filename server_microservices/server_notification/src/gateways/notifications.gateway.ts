import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../services/redis.service'; 

@WebSocketGateway({
  cors: {
    origin: '*', 
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients = 0; 

  constructor(private readonly redisService: RedisService) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    this.connectedClients++;
    console.log(`Client connected: ${client.id}. Total connected: ${this.connectedClients}`);
    this.emitClientCount();
  }

  handleDisconnect(client: Socket) {
    this.connectedClients--;
    console.log(`Client disconnected: ${client.id}. Total connected: ${this.connectedClients}`);
    this.emitClientCount(); 
  }

  emitClientCount() {
    this.server.emit('clientCount', { total: this.connectedClients });
  }

  @SubscribeMessage('getClientCount')
  handleGetClientCount(client: Socket) {
    client.emit('clientCount', { total: this.connectedClients });
  }
}
