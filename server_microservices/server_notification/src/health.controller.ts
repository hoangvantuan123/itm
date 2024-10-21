import { Controller, Get } from '@nestjs/common';
import * as si from 'systeminformation';
import { RedisService } from './services/redis.service';

@Controller('api/check/health')
export class HealthController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  async checkHealth() {
    const cpuTemperature = await si.cpuTemperature();
    const memoryUsage = process.memoryUsage();
    const diskInfo = await si.fsSize();

    return {
      status: 'up',
      timestamp: new Date().toISOString(),
      database: { status: 'up' },
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
      },
      cpu: {
        temperature: cpuTemperature.main,
      },
      disk: diskInfo.map(disk => ({
        fs: disk.fs,
        size: disk.size,
        used: disk.used,
        available: disk.available,
        status: disk.used / disk.size < 0.9 ? 'healthy' : 'full', 
      })),
    };
  }


  @Get('ping')
  async ping() {
    const response = await this.redisService.ping();
    return { message: response };
  }
}
