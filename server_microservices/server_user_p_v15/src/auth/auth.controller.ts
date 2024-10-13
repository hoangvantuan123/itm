import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
  UnauthorizedException,
  Put
} from '@nestjs/common';
import { AppService } from './auth.service';
import { UserService } from './user.service';
import { RegistrationDto } from './registration.dto';
import { LoginDto } from './login.dto';
import { ChangePasswordDto } from './change-password.dto';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/config/config';

@Controller('api/sv1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    const user = await this.appService.registerUser(registrationData);
    return user;
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.appService.loginUser(loginDto);
  }

  @Post('change-password')
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    const { oldPassword, newPassword } = changePasswordDto;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, jwtConstants.secret);
      const userId = (decodedToken as { id: number }).id;

      await this.appService.changePassword(userId, oldPassword, newPassword);
      return res
        .status(HttpStatus.OK)
        .json({
          message: 'You have successfully changed your password',
          decodedToken,
        });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: 'Token is required' });
    }

    try {
      const { token: newToken } = await this.appService.refreshToken(token);
      return res.json({
        success: true,
        data: {
          token: newToken,
        },
      });
    } catch (error) {
      return res.status(401).json({ success: false, error: error.message });
    }
  }


  @Put('bulk-update-password')
  async bulkUpdatePassword(   @Req() req: Request, @Body() body: { userIds: number[], newPassword: string }): Promise<void> {
    const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
    const { userIds, newPassword } = body;
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    if (!userIds || !newPassword) {
      throw new Error('ID người dùng và mật khẩu mới là bắt buộc');
    }

    try {
      const decodedToken = jwt.verify(token, jwtConstants.secret) as {
        id: number;
      };
      const userId = decodedToken.id;

      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return await this.appService.bulkUpdatePassword(userId, userIds, newPassword);
    } catch (error) {
      throw new UnauthorizedException(
        'Request sending failed, please try again!',
      );
    }

  }
}
