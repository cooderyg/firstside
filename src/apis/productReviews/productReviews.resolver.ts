import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductReviewsService } from './productReviews.service';
import { ProductReview } from './entities/productReview.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { Max, Min, min } from 'class-validator';
import { CreateProductReviewInput } from './dto/create-productReview.input';

@Resolver()
export class ProductReviewsResolver {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  // 제품별 리뷰조회
  @Query(() => [ProductReview])
  fetchProductReviews(
    @Args('productId') productId: string, //
    @Args('page') page: number,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.findByProductId({ productId, page });
  }

  // 제품별 리뷰갯수 조회
  @Query(() => Int)
  fetchProductReviewsCount(
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.productReviewsService.countByProduct({ productId });
  }

  // 리뷰 생성
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => ProductReview)
  createProductReview(
    @Context() context: IContext,
    @Args('createProductReviewInput')
    createProductReviewInput: CreateProductReviewInput,
  ): Promise<ProductReview> {
    const userId = context.req.user.id;
    return this.productReviewsService.create({
      createProductReviewInput,
      userId,
    });
  }

  // 리뷰 삭제
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteProductReview(
    @Context() context: IContext,
    @Args('productReviewId') productReviewId: string, //
  ): Promise<string | boolean> {
    const userId = context.req.user.id;
    return this.productReviewsService.delete({ productReviewId, userId });
  }
}
