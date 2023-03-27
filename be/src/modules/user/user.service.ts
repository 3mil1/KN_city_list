import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';
import { DatabaseError } from 'pg-protocol';
import { UserResponseDto } from '@app/modules/user/dto/user.dto';
import { PostgresErrorCode } from '@app/common/enums/postgres-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(email: string, pwHash: string): Promise<UserResponseDto | null> {
    try {
      const user = this.userRepository.create({
        email,
        passwordHash: pwHash,
      });
      await this.userRepository.save(user);

      const userResponseDto = new UserResponseDto();
      userResponseDto.id = user.id;
      userResponseDto.email = user.email;

      return userResponseDto;
    } catch (error: any) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError as DatabaseError;
        if (err.code === PostgresErrorCode.UniqueViolation) {
          throw new ConflictException('email already exist');
        }

        throw new Error('Something went wrong');
      }
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserRoles(userId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.role'],
    });
    if (!user) return null;

    return user.roles.map((role) => role.role.role);
  }
}
