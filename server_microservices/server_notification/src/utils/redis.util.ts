import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClient;

  constructor() {
    this.client = new RedisClient({ host: 'localhost', port: 6379 });
  }

  saveSocketId(userId: string, socketId: string) {
    this.client.set(`user:${userId}`, socketId);
  }

  removeSocketId(socketId: string) {
    // Xóa socketId khỏi Redis
    this.client.del(`socket:${socketId}`);
  }

  async getSocketId(userId: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.client.get(`user:${userId}`, (err, socketId) => {
        if (err) reject(err);
        resolve(socketId);
      });
    });
  }
}
