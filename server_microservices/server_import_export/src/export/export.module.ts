import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { ExportServices } from './services/export.services';
import { ExportController } from './controller/export.controller';
@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [ExportServices],
  controllers: [ ExportController],
  exports: [],
})
export class ExportModule {}
