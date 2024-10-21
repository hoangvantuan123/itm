import * as cluster from 'cluster';
import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../modules/app.module';

const numCPUs = os.cpus().length;

async function bootstrap() {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();  // Tạo worker mới
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`Worker ${process.pid} started`);
  }
}
bootstrap();
