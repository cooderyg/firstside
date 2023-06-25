import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  //-------------------------- 토글 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  toggleFavorite(
    @Context() context: IContext,
    @Args('productId') productId: string,
  ): Promise<string> {
    return this.favoritesService.toggle({
      productId,
      userId: context.req.user.id,
    });
  }
}
