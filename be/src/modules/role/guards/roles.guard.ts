import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from '@app/modules/user/user.entity';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
  email: string;
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

function isDecodedToken(obj: unknown): obj is DecodedToken {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'email' in obj &&
    'sub' in obj &&
    'roles' in obj &&
    'iat' in obj &&
    'exp' in obj
  );
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const jwt = request.headers.authorization;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const decoded = jwt_decode<JwtPayload>(jwt || '') || null;
    if (!isDecodedToken(decoded)) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const userRoles = decoded.roles;
    const user: UserEntity = request.user as UserEntity;

    const hasRole = () => userRoles.some((role: string) => roles.includes(role));
    if (user && hasRole()) {
      return true;
    }

    throw new HttpException('You do not have permission (role)', HttpStatus.UNAUTHORIZED);
  }
}
