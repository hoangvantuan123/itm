import { Body, Req, Controller, Post, HttpException, Res, HttpStatus, Put, UsePipes, Param, Delete, UnauthorizedException, ValidationPipe, Logger, Get, Query } from '@nestjs/common';
import { CreatePersonnelWithDetailsDto } from '../dto/create-personnel-with-details.dto';
import { HrRecruitmentServices } from '../services/hr_recruitment.services';
import { Personnel } from '../entity/personnel.entity';
import { InterviewResult } from '../entity/interview_results.entity';
import { UpdateInterviewResultDto } from '../dto/update_interview_result.dto';
import { CreatePersonnelWithDetails2Dto } from '../dto/create-personnel-with-details.dto';
@Controller('api/sv4/hr-information')
export class HrRecruitmentController {
  private readonly logger = new Logger(HrRecruitmentController.name);

  constructor(private readonly personnelService: HrRecruitmentServices) { }

  @Post('personnel')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
async create(@Body() createPersonnelWithDetailsDto: CreatePersonnelWithDetails2Dto) {
  try {
    const result = await this.personnelService.createNew(createPersonnelWithDetailsDto);

    if (result.success) {
      return {
        statusCode: HttpStatus.CREATED,
        message: result.message,
        data: result.data,
      };
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.message || 'Bad request: Could not create personnel',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  } catch (error) {
    this.logger.error('Failed to create personnel and related details', error.stack);

    if (error instanceof HttpException) {
      throw error;
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error: Could not create personnel with related details',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

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
    @Query('cid') cid?: string,
  ): Promise<{ data: Personnel[]; total: number; totalPages: number }> {
    const filter: Record<string, any> = {
      nameTags: nameTags ? nameTags.split(',') : [],
      phoneNumberTags: phoneNumberTags ? phoneNumberTags.split(',') : [],
      citizenshipIdTags: citizenshipIdTags ? citizenshipIdTags.split(',') : [],
      cid: cid ? cid.split(',') : [],
    };

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return await this.personnelService.findAllPageLimitFilter(filter, page, limit, start, end);
  }


  @Put('personnel/:id')
  async update(
    @Param('id') id: number,
    @Body() updatePersonnelWithDetailsDto: CreatePersonnelWithDetails2Dto,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    return await this.personnelService.update(id, updatePersonnelWithDetailsDto);
  }

  @Delete('personnel')
  async delete(@Body('ids') ids: number[]): Promise<{ success: boolean; message: string }> {


    return await this.personnelService.delete(ids);
  }

  @Get('personnel/:id')
  async getPersonnel(@Param('id') id: number) {
    return this.personnelService.getPersonnelById(id);
  }


  @Put('personnel/interview/:id')
  async updateInterview(
    @Param('id') id: number,
    @Body() updateDto: Partial<InterviewResult>,
    @Req() req: Request,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.personnelService.updateUserInterviewId(id, updateDto);

      return { success: true, message: 'User updated successfully' };
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate. Please try again.');
    }

  }


  @Post('personnel/interview/status')
  async updateInterviewResults(
    @Body() updateInterviewResultDto: Partial<UpdateInterviewResultDto>,
  ): Promise<{ success: boolean; message: string }> {
    return this.personnelService.updateInterviewResults(updateInterviewResultDto);
  }

  @Get('find-by-phone/:phone_number')
  async findByPhone(
    @Param('phone_number') phoneNumber: string,
  ) {
    return await this.personnelService.findByPhoneNumber(phoneNumber);
  }


}
