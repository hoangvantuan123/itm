
import { Controller, Get, Query, Res, BadRequestException } from '@nestjs/common';
import { ExportServices } from '../services/export.services';
import { Response } from 'express';
import * as json2csv from 'json2csv';
import * as exceljs from 'exceljs'; 

@Controller('api/sv3/export')
export class ExportController {
  constructor(private readonly exportServices: ExportServices) {}

  @Get('data')
  async exportData(
    @Query('table') table: string,
    @Query('filter') filter: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('fileType') fileType: string, 
    @Query('ids') ids: number[],
    @Res() res: Response
  ) {
    if (!table) {
      throw new BadRequestException('Table name is required');
    }

    let filterObject: Record<string, any> = {};
    if (filter) {
      try {
        filterObject = JSON.parse(filter);
      } catch (error) {
        throw new BadRequestException('Invalid filter format');
      }
    }

    const data = await this.exportServices.findAllByTableAndFilter(
      table,
      filterObject,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      ids
    );

    if (fileType === 'csv') {
      return this.exportToCSV(data, res);
    } else if (fileType === 'xlsx') {
      return this.exportToExcel(data, res, table);
    } else {
      throw new BadRequestException('Invalid fileType, it must be either csv or xlsx');
    }
  }

  private exportToCSV(data: any[], res: Response) {
    if (!data || data.length === 0) {
      throw new BadRequestException('No data available for export');
    }

    const fields = Object.keys(data[0]); 

    const csv = json2csv.parse(data, { fields });

    res.header('Content-Type', 'text/csv');
    res.attachment('exported_data.csv');
    res.send(csv);
  }

  private async exportToExcel(data: any[], res: Response, tableName: string) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet(tableName);

    if (data.length > 0) {
      worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));

      data.forEach((row) => {
        worksheet.addRow(row);
      });
    }

    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('exported_data.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
