import {
    Controller,
    Get,
    Post,
    HttpStatus,
    Body,
    Param,
    Put,
    Delete,
    Query,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { jwtConstants } from 'src/config/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { HrEmployeeService } from '../services/hr_employee.services';
import { HrEmployeeEntity } from '../entity/hr_employee.entity';

@Controller('api/sv1')
export class HrEmployeeController{
    constructor(private readonly hrEmployeeService: HrEmployeeService) { }

    @Post('hr_employee')
    async create(
        @Req() req: Request,
        @Body() data: Partial<HrEmployeeEntity>,
        @Res() res: Response,
    ): Promise<Response> {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException(
                'The job version has expired. Please log in again to continue.',
            );
        }

        try {
            const decodedToken = jwt.verify(token, jwtConstants.secret);

            const userId = (decodedToken as { id: number }).id;
            if (!userId) {
                throw new UnauthorizedException('Invalid token payload');
            }
            const result = await this.hrEmployeeService.create(
                userId,
                data,
            );
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            throw new UnauthorizedException(
                'Request sending failed, please try again!',
            );
        }
    }
 
    @Get('hr_employee')
    async findAllPageLimit(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Req() req: Request,
    ): Promise<{ data: HrEmployeeEntity[]; total: number }> {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token missing');
      }
  
      try {
        const decodedToken = jwt.verify(token, jwtConstants.secret) as {
          id: number;
        };
        const userId = decodedToken.id;
  
        if (!userId) {
          throw new UnauthorizedException('Invalid token payload');
        }
  
        return this.hrEmployeeService.findAllPageLimit(userId, page, limit);
      } catch (error) {
        throw new UnauthorizedException(
          'Request sending failed, please try again!',
        );
      }
    }
   

    @Delete('hr_employee')
    async remove(@Body('ids') ids: number[], @Req() req: Request): Promise<void> {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token missing');
      }
  
      try {
        const decodedToken = jwt.verify(token, jwtConstants.secret);
        const userId = (decodedToken as { id: number }).id;
        if (!userId) {
          throw new UnauthorizedException('Invalid token payload');
        }
  
        await this.hrEmployeeService.remove(userId, ids);
      } catch (error) {
        throw new UnauthorizedException('Request failed, please try again!');
      }
    }
}
