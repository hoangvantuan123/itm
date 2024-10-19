import { Body, Req, Controller, Post, HttpException, HttpStatus, Res, Put, UsePipes, Param, Delete, UnauthorizedException, ValidationPipe, Logger, Get, Query } from '@nestjs/common';
import { HrTimekeeping } from '../entity/hr_timekeeping.entity';
import { HrTimeKeepingServices } from '../services/hr_timekeeping.services';

@Controller('api/sv4/hr-timekeeping')
export class HrTimeKeepingController {
    private readonly logger = new Logger(HrTimeKeepingController.name);

    constructor(private readonly hrTimekeepingService: HrTimeKeepingServices) { }

    @Post('new')
    async create(
        @Req() req: Request,
        @Body() createDto: Partial<HrTimekeeping>,
    ): Promise<{ success: boolean; message: string; data?: HrTimekeeping }> {
        try {
            const result = await this.hrTimekeepingService.create(createDto);
            return result;
        } catch (error) {
            return {
                success: false,
                message: 'Error creating hrTimekeeping: ' + error.message,
            };
        }
    }

    @Get()
    async getTimekeepingByCid(
        @Query('cid') cid: string,
        @Query('month_year') month_year: string
    ): Promise<any> {
        return this.hrTimekeepingService.findByCidAndMonthYear(cid, month_year);
    }


    @Get('list')
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10000,
    ): Promise<{ data: any[]; total: number; totalPages: number }> {
        return this.hrTimekeepingService.getAllHrSalarysPageLimit({}, page, limit);
    }

    @Get('filter')
    async getAllFilter(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 500,
        @Query('date') date?: string,
        @Query('nameTags') nameTags?: string,
        @Query('cid') cid?: string,
        @Query('department') department?: string,
    ): Promise<{ data: any; total: number; totalPages: number }> {
        const filter: Record<string, any> = {
            nameTags: nameTags ? nameTags.split(',') : [],
            cid: cid ? cid.split(',') : [],
            department: department ? department.split(',') : []
        };

        return await this.hrTimekeepingService.getAllHrSalarysPageLimitFilter(filter, page, limit, date);
    }

    @Get('detail')
    async getPersonnel(@Query('cid') cid: string,
        @Query('month_year') month_year: string) {
        return this.hrTimekeepingService.getHrSalaryById(cid, month_year);
    }



}