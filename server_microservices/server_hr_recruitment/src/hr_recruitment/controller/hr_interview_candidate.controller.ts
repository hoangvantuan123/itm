// src/hr-interview-candidates/hr-interview-candidates.controller.ts
import { Body, Req, Controller, Post, HttpException, Res, HttpStatus, Put, UsePipes, Param, Delete, UnauthorizedException, ValidationPipe, Logger, Get, Query } from '@nestjs/common';
import { HrInterviewCandidatesService } from '../services/hr_interview_candidate.services';
import { HrInterviewCandidate } from '../entity/hr_interview_candidates.entity';
import { FindCandidatesDto } from '../dto/find-candidates.dto';
import { CreatePersonnelWithDetailsDto } from '../dto/create_hr_internview_candidate.dto';

@Controller('api/sv4/hr-interview-candidates')
export class HrInterviewCandidatesController {
    constructor(private readonly candidatesService: HrInterviewCandidatesService) { }

    /*   @Get()
      getAllCandidates(): Promise<HrInterviewCandidate[]> {
          return this.candidatesService.getAllCandidates();
      }
   */
    @Get(':id')
    getCandidateById(@Param('id') id: number): Promise<HrInterviewCandidate> {
        return this.candidatesService.getCandidateById(id);
    }

    @Post()
    createCandidate(@Body() createData: Partial<HrInterviewCandidate>): Promise<HrInterviewCandidate> {
        return this.candidatesService.createCandidate(createData);
    }

    @Put(':id')
    updateCandidate(
        @Param('id') id: number,
        @Body() updateData: Partial<HrInterviewCandidate>,
    ): Promise<HrInterviewCandidate> {
        return this.candidatesService.updateCandidate(id, updateData);
    }

    @Delete()
    async remove(@Body('ids') ids: number[], @Req() req: Request): Promise<void> {
        await this.candidatesService.remove(ids);
    }

    @Get()
    async getCandidate(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 500,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ): Promise<{ data: HrInterviewCandidate[]; total: number; totalPages: number }> {

        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;

        return await this.candidatesService.findAllPageLimit({}, page, limit, start, end);
    }

    @Get('find-by-phone/:phone_number')
    async findByPhone(
        @Param('phone_number') phoneNumber: string,
    ) {
        return await this.candidatesService.findByPhoneNumber(phoneNumber);
    }



    @Post('personnel')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    async create(@Body() createPersonnelWithDetailsDto: CreatePersonnelWithDetailsDto) {
        try {
            const result = await this.candidatesService.create(createPersonnelWithDetailsDto);

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
                        message: result.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error: Could not create personnel with related details',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }




    @Get('candidate/filter')
    async getAllFilterCandidate(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 500,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('nameTags') nameTags?: string,
        @Query('phoneNumberTags') phoneNumberTags?: string,
        @Query('citizenshipIdTags') citizenshipIdTags?: string,
    ): Promise<{ data: HrInterviewCandidate[]; total: number; totalPages: number }> {
        const filter: Record<string, any> = {
            nameTags: nameTags ? nameTags.split(',') : [],
            phoneNumberTags: phoneNumberTags ? phoneNumberTags.split(',') : [],
            citizenshipIdTags: citizenshipIdTags ? citizenshipIdTags.split(',') : [],
        };

        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;

        return await this.candidatesService.findAllPageLimitFilter(filter, page, limit, start, end);
    }

}
