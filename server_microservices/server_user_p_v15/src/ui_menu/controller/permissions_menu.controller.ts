import {
  Controller,
  Post,
  Get,
  HttpStatus,
  Query,
  Body,
  Req,
  Res,
  UnauthorizedException,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PermissionsMenuService } from '../services/permissions_menu.service';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/config/config';
import { PermissionsMenu } from '../entity/permissions_menu.entity';
import { UpdatePermissionsMenuDto } from '../dto/update-permissions-menu.dto';

@Controller('api/sv1')
export class PermissionMenuController {
  constructor(
    private readonly permissionsMenuService: PermissionsMenuService,
  ) {}

  @Post('permission_menus')
  async create(
    @Req() req: Request,
    @Body() body: { menuIds: number[]; groupId: number },
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

      const { menuIds, groupId } = body;
      const result = await this.permissionsMenuService.create(
        userId,
        menuIds,
        groupId,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }

  @Get('permission_menus')
  async findAllPageLimit(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
  ): Promise<{ data: PermissionsMenu[]; total: number }> {
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
      const decodedToken = jwt.verify(token, jwtConstants.secret) as {
        id: number;
      };
      const userId = decodedToken.id;

      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return this.permissionsMenuService.findAllPageLimit(userId, page, limit);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }
  @Delete('permission_menus')
  async remove(@Body('ids') ids: number[], @Req() req: Request): Promise<void> {
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

      await this.permissionsMenuService.remove(userId, ids);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }

  @Get('permission_menu/:groupId')
  async findUsersByGroupId(
    @Req() req: Request,
    @Res() res: Response,
    @Param('groupId') groupId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
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

      const result = await this.permissionsMenuService.findUsersByGroupId(
        groupId,
        userId,
        page,
        limit,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }

  @Put('permission_menus')
  async updatePermissionsMenu(
    @Body() updateDto: UpdatePermissionsMenuDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
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
      const decodedToken = jwt.verify(token, jwtConstants.secret);
      const userId = (decodedToken as { id: number }).id;
      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const result = await this.permissionsMenuService.updatePermissionsMenu(
        userId,
        updateDto,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }
}
