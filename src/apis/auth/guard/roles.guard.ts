import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLE } from 'src/apis/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>('roles', [
      context.getHandler(), //
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;
    return requiredRoles.some((role) => {
      if (user?.roles?.includes('ADMIN')) return true;
      return user?.roles?.includes(role);
    });
  }
}
