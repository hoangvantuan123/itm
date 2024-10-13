import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from '../services/table.services';

@Controller('api/sv1')
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @Get("tables")
  async getTables() {
    return await this.tableService.getTables();
  }
  /* GET http://localhost:3000/table/table1,table2,table3
   */
  @Get('table/:names')
  async getTableByName(@Param('names') names: string) {
    const tableNames = names.split(',');
    const tables = await this.tableService.getTablesByNames(tableNames);
    if (tables.length === 0) {
      return { message: 'No tables found' };
    }

    return tables;
  }


}
