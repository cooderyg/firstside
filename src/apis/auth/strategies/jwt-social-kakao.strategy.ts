import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: 'http://localhost:5000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(profile);

    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      password: '1234',
      age: 0,
    };
  }
}
