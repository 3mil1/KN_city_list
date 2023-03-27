import { BadRequestException, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '@app/modules/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request): Promise<{ access_token: string }> {
    const { user } = req;
    if (!user || typeof user !== 'object' || Array.isArray(user)) {
      throw new BadRequestException('Invalid user object');
    }
    return this.authService.login(user as UserEntity);
  }
}
