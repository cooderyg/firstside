import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { StoresService } from './stores.service';
import { CreateStoreInput } from './dto/create-store.dto';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { ROLE } from '../users/entities/user.entity';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Store } from './entities/store.entity';

@Resolver()
export class StoresResolver {
  constructor(
    private readonly storesService: StoresService, //
  ) {}

  @HasRoles(ROLE.SELLER)
  @UseGuards(GqlAuthGuard('access'), RolesGuard)
  @Mutation(() => Store)
  createStore(
    @Args('createStoreInput') createStoreInput: CreateStoreInput, //
    @Context() context: IContext,
  ): Promise<Store> {
    const userId = context.req.user.id;
    return this.storesService.createStore({ createStoreInput, userId });
  }
}
