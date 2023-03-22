import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { UserEntity } from '@app/modules/user/user.entity';
import { hashPassword } from '@app/common/utils/crypto-password';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<UserEntity> {
    const hashedPassword = await hashPassword(password);
    // todo remove pw hash!
    return this.usersService.createUser(email, hashedPassword);
  }
}
