import {
  Controller,
  Req,
  Get,
  HttpStatus,
  Query,
  Res,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { MenuService } from '../services/ui_menu.service';
import { IrUiMenu } from '../entity/ui_menu.entity';
import { jwtConstants } from 'src/config/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('api/sv1')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('menu/all')
  async findAll(
    @Req() req: Request,
  ): Promise<{ data: IrUiMenu[]; total: number }> {
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

      return this.menuService.findAll(userId);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }
  @Get('menu')
  async findAllPageLimit(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
  ): Promise<{ data: IrUiMenu[]; total: number }> {
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

      return this.menuService.findAllPageLimit(userId, page, limit);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }
  @Get('menu/:id')
  async findOne(@Param('id') id: number): Promise<IrUiMenu> {
    return this.menuService.findOne(id);
  }

  @Post('menu')
  async create(
    @Body() createUIMenu: IrUiMenu,
    @Req() req: Request,
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

      const result = await this.menuService.create(userId, createUIMenu);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }

  @Put('menu/:id')
  async update(
    @Param('id') id: number,
    @Body() menu: Partial<IrUiMenu>,
    @Req() req: Request,
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

      const result = await this.menuService.update(userId, id, menu);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }

/*   @Delete('menu/:id') */
 /*  async remove(@Param('id') id: number): Promise<void> {
    return this.menuService.remove(id);
  }
 */

  @Delete('menu')
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

      await this.menuService.remove(userId, ids);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }

  @Get('available')
  async getAvailableMenus(
    @Query('groupId') groupId: number,
    @Req() req: Request,
    @Res() res: Response,
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

      const result = await this.menuService.getAvailableMenus(
        groupId,
        userId,
        page,
        limit,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }
}
