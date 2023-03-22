import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';
import { DatabaseError } from 'pg-protocol';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(email: string, pwHash: string): Promise<UserEntity | null> {
    try {
      const user = this.userRepository.create({
        email,
        passwordHash: pwHash,
      });
      await this.userRepository.save(user);
      return user;
    } catch (error: any) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError as DatabaseError;

        if (err.code === PostgresErrorCode.UniqueViolation) {
          throw new ConflictException('username already exist');
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
