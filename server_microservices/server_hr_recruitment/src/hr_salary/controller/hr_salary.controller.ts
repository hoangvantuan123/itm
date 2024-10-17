import { Controller, Post, Get, Param, Body, Query, Delete, BadRequestException } from '@nestjs/common';
import { HrSalaryService } from '../services/hr_salary.services';
import { HrSalary } from '../entity/hr_salary.entity';

@Controller('api/sv4/hr-salary')
export class HrSalaryController {
  constructor(private readonly hrSalaryService: HrSalaryService) { }

  @Post('create')
  async create(@Body() data: Partial<HrSalary>): Promise<HrSalary> {
    return this.hrSalaryService.createHrSalary(data);
  }

  @Get('cid/:cid')
  async getByCid(
    @Param('cid') cid: string,
    @Query('monthYear') monthYear: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10000
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    return this.hrSalaryService.getHrSalaryByCid(page, limit, cid, monthYear);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10000,
    @Query('date') date?: string,
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    return this.hrSalaryService.getAllHrSalariesPageLimit({}, page, limit, date);
  }



  @Delete('delete')
  async delete(@Body('ids') ids: number[]): Promise<{ success: boolean; message: string }> {
    try {
      await this.hrSalaryService.remove(ids);
      return { success: true, message: 'Deleted successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to delete records' };
    }
  }

  @Get('filter')
  async getAllFilter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 500,
    @Query('date') date?: string,
    @Query('nameTags') nameTags?: string,
    @Query('cid') cid?: string,
    @Query('syn') syn?: boolean,
    @Query('department') department?: string,
  ): Promise<{ data: HrSalary[]; total: number; totalPages: number }> {
    const filter: Record<string, any> = {
      nameTags: nameTags ? nameTags.split(',') : [],
      cid: cid ? cid.split(',') : [],
      syn: syn !== undefined ? syn : undefined,
      department: department ? department.split(',') : []
    };

    return await this.hrSalaryService.findAllPageLimitFilter(filter, page, limit, date);
  }


  @Get('detail/:id')
  async getPersonnel(@Param('id') id: number) {
    return this.hrSalaryService.getHrSalaryById(id);
  }

  @Get('detail/uers-lock/:id/:cid')
  async getPersonnelCidID(
    @Param('id') id: number,
    @Param('cid') cid: string
  ) {
    if (!id || !cid) {
      throw new BadRequestException('Missing id or cid');
    }
    return this.hrSalaryService.getHrSalaryByIdAndCid(id, cid);
  }

}
