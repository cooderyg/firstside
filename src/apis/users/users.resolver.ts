import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //-------------------------- 조회 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  async fetchUser(@Context() context: IContext): Promise<User> {
    const user = await this.usersService.findById({ id: context.req.user.id });
    return user;
  }

  //-------------------------- 생성 --------------------------//
  @Mutation(() => User)
  createUser(@Args() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create({ createUserDto });
  }
}
