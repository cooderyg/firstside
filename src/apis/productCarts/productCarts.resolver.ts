import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCartsSerivce } from './productCarts.service';
import { ProductCart, ProductInfo } from './entities/productCart.entity';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

@Resolver()
export class ProductCartsResolver {
  constructor(private readonly productCartsService: ProductCartsSerivce) {}

  //-------------------------- 조회 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [ProductCart])
  fetchProductCarts(@Context() context: IContext): Promise<ProductCart[]> {
    const userId = context.req.user.id;
    return this.productCartsService.findByUser({ userId });
  }

  //-------------------------- 생성 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => ProductCart)
  createProductCart(
    @Context() context: IContext,
    @Args('productId') productId: string,
    @Args('quantity') quantity: number,
  ): Promise<ProductCart> {
    const userId = context.req.user.id;
    return this.productCartsService.create({ userId, productId, quantity });
  }

  //-------------------------- 삭제 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteProductCart(
    @Context() context: IContext, //
    @Args('productCartId') productCartId: string,
  ): Promise<string> {
    const userId = context.req.user.id;
    return this.productCartsService.delete({ userId, productCartId });
  }

  //-------------------------- 수정 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  updateProductCart(
    @Context() context: IContext,
    @Args('productCartId') productCartId: string,
    @Args('productInfos') productInfos: ProductInfo[],
  ) {
    const userId = context.req.user.id;
    return this.productCartsService.update({
      userId,
      productCartId,
      productInfos,
    });
  }
}
