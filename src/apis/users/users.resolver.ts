import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard('access')) // 가드를 사용하지만 rest api 가 기본이기 때문에 Gql api에 맞춰주는 가드로 만듦
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    //가드 & passport 개발이후 진짜 유저정보 받아오기
    console.log('======================');
    console.log(context.req.user); //passport로 만들 데이터
    console.log('======================');
    return '인가에 성공하였습니다.';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
