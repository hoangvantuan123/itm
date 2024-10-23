import { Body, Req, Controller, Post, HttpException, HttpStatus, Res, Put, UsePipes, Param, Delete, UnauthorizedException, ValidationPipe, Logger, Get, Query } from '@nestjs/common';
import { DefaultMapping } from '../entity/default_mappings.entity';
import { DefaultMappingServices } from '../services/default_mapping.services';
@Controller('api/sv3/default-mapping')
export class DefaultMappingController {
  constructor(
    private readonly defaultMappingService: DefaultMappingServices,
  ) { }

  @Get('filter')
  async getAllFilter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 500,
    @Query('nameTags') nameTags?: string
  ): Promise<{ data: DefaultMapping[]; total: number; totalPages: number }> {
    const filter: Record<string, any> = {
      nameTags: nameTags ? nameTags.split(',') : [],
    };


    return await this.defaultMappingService.findAllPageLimitFilter(filter, page, limit);
  }

  @Get("all")
  async getAllMappings(): Promise<Record<string, string>> {
    return this.defaultMappingService.getAllMappings();
  }

  @Post('new')
  async create(
    @Req() req: Request,
    @Body() createDto: Partial<DefaultMapping>,
  ): Promise<{ success: boolean; message: string; data?: DefaultMapping }> {
    try {
      const result = await this.defaultMappingService.create(createDto);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Error creating hrInter: ' + error.message,
      };
    }
  }

  @Delete('delete')
  async delete(@Body('ids') ids: number[]): Promise<{ success: boolean; message: string }> {
    try {
      await this.defaultMappingService.remove(ids);
      return { success: true, message: 'Deleted successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to delete records' };
    }
  }
}
