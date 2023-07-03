import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  //-------------------------- 조회 --------------------------//
  //제품 페이지조회
  @Query(() => [Product])
  fetchProducts(@Args('page') page: number): Promise<Product[]> {
    return this.productsService.findAll({ page });
  }

  // fav제품 조회
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Product])
  fetchFavProducts(@Context() context: IContext): Promise<Product[]> {
    const userId = context.req.user.id;
    return this.productsService.findFavProduct({ userId });
  }

  // 제품 상세조회
  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  // 제품 카운트
  @Query(() => Int)
  fetchProductCount(): Promise<number> {
    return this.productsService.count();
  }

  //-------------------------- 생성 --------------------------//
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  //-------------------------- 삭제 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteProduct(
    @Context('context') context: IContext, //
    @Args('productId') productId: string,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return this.productsService.delete({ productId, userId });
  }
}
