import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@app/modules/user/user.service';
import { UserEntity } from '@app/modules/user/user.entity';
import { validatePassword } from '@app/common/utils/crypto-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;

    const passwordIsValid = await validatePassword(password, user.passwordHash);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordIsValid) {
      return user;
    }
    return null;
  }

  login(user: UserEntity): { access_token: string } {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
