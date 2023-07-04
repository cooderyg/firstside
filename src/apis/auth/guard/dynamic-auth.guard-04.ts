import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// object literal lookup
const DYNAMIC_AUTH_GUARD = ['google', 'kakako', 'naver'].reduce(
  (prev, curr) => {
    const result = {
      ...prev,
      [curr]: new (class extends AuthGuard(curr) {})(),
    };
    return result;
  },
  {},
);

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
