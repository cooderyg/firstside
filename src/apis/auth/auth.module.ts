import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt-social-kakao.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
