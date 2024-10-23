import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { ImportServices } from './services/import.services';
import { ImportController } from './controller/import.controller';
import { TestImportServices } from './services/test_import.services';
import { DefaultMappingController } from './controller/default_mapping.controller';
import { DefaultMappingServices } from './services/default_mapping.services';
import { DefaultMapping } from './entity/default_mappings.entity';
@Module({
  imports: [
    DatabaseModule,  TypeOrmModule.forFeature([DefaultMapping ]),
  ],
  providers: [ImportServices, TestImportServices, DefaultMappingServices],
  controllers: [ImportController, DefaultMappingController],
  exports: [],
})
export class ImportModule {}
