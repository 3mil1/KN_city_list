import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@app/modules/auth/auth.controller';
import { AuthService } from '@app/modules/auth/auth.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

const mockAuthService = {
  login: jest.fn(),
};

const mockRequest = (): Request => {
  const req = {} as Request;
  req.body = jest.fn().mockReturnValue(req);
  req.user = jest.fn().mockReturnValue(req);
  return req;
};
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return access token with valid credentials', async () => {
      const req = mockRequest();
      const expectedResult = { access_token: '1234' };
      const user = { username: 'user', password: 'pass' };
      req.user = user;

      mockAuthService.login.mockResolvedValue(expectedResult);

      expect(await controller.login(req)).toBe(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should throw an UnauthorizedException with invalid credentials', async () => {
      const req = mockRequest();
      const user = { username: 'user', password: 'pass' };
      req.user = user;

      mockAuthService.login.mockRejectedValue(new UnauthorizedException());

      await expect(controller.login(req)).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should throw an UnauthorizedException with missing credentials', async () => {
      const req = mockRequest();
      const user = {};
      req.user = user;

      mockAuthService.login.mockRejectedValue(new UnauthorizedException());

      await expect(controller.login(req)).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });
  });
});
