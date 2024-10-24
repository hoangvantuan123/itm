import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  server.use(express.json({ limit: '100mb' }));
  server.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Cấu hình cors
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://devbeta.online',
        'https://www.devbeta.online',
        'http://192.168.60.248:90'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  const port = process.env.PORT || 5050;
  await app.listen(port);
}
bootstrap();
