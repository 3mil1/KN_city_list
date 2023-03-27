import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@app/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserEntity } from '@app/modules/user/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  interface UserServiceMock {
    getUserByEmail: jest.Mock<Promise<UserEntity>, [string]>;
    getUserRoles: jest.Mock<string[], [UserEntity]>;
  }

  let authService: AuthService;
  let userService: UserServiceMock;

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('access_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
            getUserRoles: jest.fn().mockReturnValue(['user']),
          },
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserServiceMock>(UserService);
  });

  describe('login', () => {
    const userLogin = {
      email: 'user@example.com',
      password: '1234',
    };

    const user = {
      id: 'dd48bb53-2861-4603-b9ef-f571716b0a89',
      email: 'admin@admin.ee',
      passwordHash:
        '$scrypt$N=32768,r=8,p=1,maxmem=67108864$4/6tvajNiL4WopM5DGWL7tUhPar5/xv9O9H8HqzeJLM$++WcCncFjUjrajwQeGzry1PCai7ns8Fq1eTHY38RvQ4NwxjNlHVsQf3igYfjnF1YhbStX3m0fTUfwZizytvC7Q',
    };

    beforeEach(() => {
      userService.getUserByEmail.mockResolvedValue(user as UserEntity);
    });

    it('should return access token with valid credentials', async () => {
      const result = await authService.validateUser(userLogin.email, userLogin.password);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(userLogin.email);
      expect(result).toEqual(user);
    });

    it('should throw an UnauthorizedException with invalid credentials', async () => {
      const userWithEmail = {
        id: '123',
        email: 'user@example.com',
        passwordHash:
          '$scrypt$N=32768,r=8,p=1,maxmem=67108864$4/6tvajNiL4WopM5DGWL7tUhPar5/xv9O9H8HqzeJLM$++WcCncFjUjrajwQeGzry1PCai7ns8Fq1eTHY38RvQ4NwxjNlHVsQf3igYfjnF1YhbStX3m0fTUfwZizytvC',
      };
      userService.getUserByEmail.mockResolvedValueOnce(userWithEmail as UserEntity);

      await expect(authService.validateUser(userLogin.email, 'wrongPw')).rejects.toThrow(UnauthorizedException);
      expect(userService.getUserByEmail).toHaveBeenCalledWith(userLogin.email);
    });

    it('should generate and return access token', async () => {
      const token = await authService.login(user as UserEntity);

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: user.id,
          roles: ['user'],
        }),
      );
      expect(token).toEqual({ access_token: 'access_token' });
    });
  });
});
