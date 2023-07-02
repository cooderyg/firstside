import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 3. 일치하는 유저가 있지만 비밀번호가 틀렸다면 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 헤더에 refreshToken 넣기 body랑 다르게 알아서 딸려들어가기 때문에 return이 필요없음
    this.setRefreshToken({ user, res: context.res });

    // 5. 일치하는 유저도 있고 비번도 맞으면  accessToken 발급 및 전달
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }) {
    // 1. 회원조회
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/social-login.html');
    // 나중에 프론트 주소 다시만들것
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    // 개발환경
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );
    res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // 배포환경 (배포환경에서는 httponly와 secuer 옵션을 적용해서 https환경만 사용가능 & 쿠키에 접근을 막을 수 있음)
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`,);
    // context.res.setHeader('Access-Control-Alloe-Origin', 'https://myfrontsite.com')
  }

  // refresh 토큰 검증완료 후 AccessToken 재발급
  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    // 프론트에서는 유저ID를 req에 넣어서 보내줌
    return this.getAccessToken({ user });
  }

  // AccessToken 제작
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}
