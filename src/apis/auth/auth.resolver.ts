import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('loginInput') loginInput: LoginInput, //
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ loginInput, context });
  }

  //유저가 직접 요청하는 것이아니라 먼저 refreshToken에 대한 부분을
  //front에서 확인요청을 주고 그 이후 로그인이 안되어 있을 때 로그인페이지로 redirect 작업하기
  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
