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
    
    

  

}