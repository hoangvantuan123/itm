import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ImportServices } from '../services/import.services';
import { ImportDataDto } from '../dto/import.dto';
import { TestImportServices } from '../services/test_import.services';

@Controller('api/sv3')
export class ImportController {
  constructor(
    private readonly importService: ImportServices,
    private readonly testImportService: TestImportServices
  ) { }
  @Post('import')
  async importData(@Body() data: ImportDataDto): Promise<{ status: number; message: string }> {
    try {
      await this.importService.processImportData(data);
      return { status: 200, message: 'Dữ liệu đã được nhập khẩu thành công' };
    } catch (error) {
      return { status: 400, message: `Có lỗi xảy ra trong quá trình nhập dữ liệu: ${error.message || 'Không xác định'}` };
    }
  }

  @Post('test-import')
  async testImport(@Body() data: ImportDataDto): Promise<{ status: number; message: string }> {
    try {
      await this.testImportService.testImportData(data);
      return { status: 200, message: 'Dữ liệu import hợp lệ!' };
    } catch (error) {
      return { status: 400, message: `Lỗi: ${error.message}` };
    }
  }

}
