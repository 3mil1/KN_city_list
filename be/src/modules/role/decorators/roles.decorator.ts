import { SetMetadata } from '@nestjs/common';

export const HasRoles = (
  ...roles: string[]
): MethodDecorator & ClassDecorator => SetMetadata('roles', roles);
