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
import { UsersPermissionsService } from './user_permissions.services';
import { jwtConstants } from 'src/config/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('api/sv1')
export class UsersPermissionsController {
    constructor(private readonly userPermissionsService: UsersPermissionsService) { }

    @Get('details/7e7c585f91ff5c2b64e75c2cfdb650e60d5f81f87b3fdd24144dfd82dc7a6d42')
    async getUserDetails(@Req() req: Request,
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
            const tokenId = (decodedToken as { id: number }).id;
            if (!tokenId) {
                throw new UnauthorizedException('Invalid token payload');
            }

            const result = await this.userPermissionsService.findUserDetailsById(tokenId)
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            throw new UnauthorizedException(
                'Request sending failed, please try again!',
            );
        }
       
    }

}
