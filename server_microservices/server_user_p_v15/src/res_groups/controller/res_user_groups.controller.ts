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
} from '@nestjs/common';
import { ResUserGroupsService } from '../services/res_user_groups.services';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/config/config';

@Controller('api/sv1')
export class ResUserGroupsController {
  constructor(private readonly resGroupsService: ResUserGroupsService) { }

  @Post('res_user_groups')
  async create(
    @Req() req: Request,
    @Body() body: { userIds: number[]; groupId: number },
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

      const { userIds, groupId } = body;
      const result = await this.resGroupsService.create(
        userId,
        userIds,
        groupId,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }
  @Post('res_user_groups/groups')
  async createUserGroups(
    @Req() req: Request,
    @Body() body: { userId: number; groupIds: number[] },
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
      const tokenId = (decodedToken as { id: number }).id;
      if (!tokenId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const { userId, groupIds } = body;
      const result = await this.resGroupsService.createUserGroups(
        tokenId,
        userId,
        groupIds,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }
  }

  @Get('group/:groupId')
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

      const result = await this.resGroupsService.findUsersByGroupId(
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

  @Delete('res_user_groups')
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

      await this.resGroupsService.remove(userId, ids);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }


  @Get('available_users')
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

      const result = await this.resGroupsService.getAvailableUsersGroup(
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

  @Get('res_user_groups/:groupId')
  async getUserGroupsId(
    @Param('groupId') groupId: number,
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
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

      const result = await this.resGroupsService.findUsersGroupById(
        userId,
        groupId,
        page,
        limit,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }
  }


  @Get('user_group/status/:id')
  async getUserGroups(@Param('id') id: number, @Req() req: Request,
    @Res() res: Response) {
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
      const result = await this.resGroupsService.getUserGroupsWithStatus(userId, id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new UnauthorizedException('Request failed, please try again!');
    }

  }

}
