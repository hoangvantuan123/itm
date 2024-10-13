import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableService } from './services/table.services';
import { TableController } from './controller/table.controller';

@Module({
  imports: [

  ],
  providers: [TableService],
  controllers: [TableController],
  exports: [],
})
export class TableModule {}
