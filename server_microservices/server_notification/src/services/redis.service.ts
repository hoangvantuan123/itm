import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: 'localhost',
            port: 6379,
        });
    }

    async set(key: string, value: string) {
        await this.redis.set(key, value);
    }

    async get(key: string) {
        return await this.redis.get(key);
    }
    async ping() {
        return await this.redis.ping();
    }

}
