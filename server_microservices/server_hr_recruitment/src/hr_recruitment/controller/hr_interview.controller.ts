import { Body, Req, Controller, Post, HttpException, HttpStatus, Put, UsePipes, Param, Delete, UnauthorizedException, ValidationPipe, Logger, Get, Query } from '@nestjs/common';
import { Personnel } from '../entity/personnel.entity';
import { HrInterviewServices } from '../services/hr_interview.services';




@Controller('api/sv4/hr-interview')
export class HrInterviewController {
  private readonly logger = new Logger(HrInterviewController.name);

  constructor(private readonly personnelService: HrInterviewServices) { }

  @Get('personnel')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10000,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;
    return this.personnelService.findAllPageLimit({}, page, limit, startDateObj, endDateObj);
  }


  @Get('personnel/filter')
  async getAllFilterPersonnel(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 500,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('nameTags') nameTags?: string,
    @Query('phoneNumberTags') phoneNumberTags?: string,
    @Query('citizenshipIdTags') citizenshipIdTags?: string,
  ): Promise<{ data: Personnel[]; total: number; totalPages: number }> {
    const filter: Record<string, any> = {
      nameTags: nameTags ? nameTags.split(',') : [],
      phoneNumberTags: phoneNumberTags ? phoneNumberTags.split(',') : [],
      citizenshipIdTags: citizenshipIdTags ? citizenshipIdTags.split(',') : [],
    };

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return await this.personnelService.findAllPageLimitFilter(filter, page, limit, start, end);
  }




}
