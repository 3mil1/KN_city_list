import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@app/modules/user/user.service';
import { UserEntity } from '@app/modules/user/user.entity';
import { validatePassword } from '@app/common/utils/crypto-password';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;

    const passwordIsValid = await validatePassword(password, user.passwordHash);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user && passwordIsValid) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const roles = await this.usersService.getUserRoles(user.id);
    const payload = { email: user.email, sub: user.id, roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
