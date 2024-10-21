import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Mở CORS nếu cần
  await app.listen(8000);
  console.log('Application is running on: http://localhost:8000');
}
bootstrap();
