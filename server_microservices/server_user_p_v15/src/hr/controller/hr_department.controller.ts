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
import { DepartmentEntity } from '../entity/hr_department.entity';
import { HrDepartmentService } from '../services/hr_department.services';
@Controller('api/sv1')
export class HrDepartmentController{
    constructor(private readonly hrDepartmentService: HrDepartmentService) { }

    @Post('hr_department')
    async create(
        @Req() req: Request,
        @Body() data: Partial<DepartmentEntity>,
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
            const result = await this.hrDepartmentService.create(
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
 
    @Get('hr_department')
    async findAllPageLimit(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Req() req: Request,
    ): Promise<{ data: DepartmentEntity[]; total: number }> {
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
  
        return this.hrDepartmentService.findAllPageLimit(userId, page, limit);
      } catch (error) {
        throw new UnauthorizedException(
          'Request sending failed, please try again!',
        );
      }
    }



    @Get('hr_department/all')
  async findAll(
    @Req() req: Request,
  ): Promise<{ data: DepartmentEntity[]; total: number }> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'The job version has expired. Please log in again to continue.',
      );
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

      return this.hrDepartmentService.findAll(userId);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }
   

}
