import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorization; //Bearer dfpskjmflsvgcklvx
      //     const accessToken = temp.toLowercase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }
  validate(payload) {
    // validate 오버라이딩을 해야 하기 때문에 스펠링 틀리면 안됨
    // console.log(payload); // payload : { sub: ---, iat: ---, exp: --- }
    return {
      id: payload.sub,
    };
  }
}
