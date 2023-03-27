import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { hashPassword } from '@app/common/utils/crypto-password';
import { UserResponseDto } from '@app/modules/user/dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(@Body('password') password: string, @Body('email') email: string): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(password);
    return this.usersService.createUser(email, hashedPassword);
  }
}
