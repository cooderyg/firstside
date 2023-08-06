import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductReviewsService } from './productReviews.service';
import { ProductReview } from './entities/productReview.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { CreateProductReviewInput } from './dto/create-productReview.input';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { ROLE } from '../users/entities/user.entity';

@Resolver()
export class ProductReviewsResolver {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  //-------------------------- 조회 --------------------------//
  // 제품별 리뷰조회
  @Query(() => [ProductReview])
  fetchProductReviewsFindByProduct(
    @Args('productId') productId: string, //
    @Args('page') page: number,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.findByProductId({ productId, page });
  }

  // 유저별 리뷰조회
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [ProductReview])
  fetchProductReviewsFindByUser(
    @Context() context: IContext,
    @Args('page') page: number, //
  ): Promise<ProductReview[]> {
    const userId = context.req.user.id;
    return this.productReviewsService.findByUserId({ userId, page });
  }
  // 제품별 리뷰갯수 조회
  @Query(() => Int)
  fetchProductReviewsCountByProduct(@Args('productId') productId: string): Promise<number> {
    return this.productReviewsService.countByProduct({ productId });
  }

  // 유저별 리뷰갯수 조회
  @Query(() => Int)
  fetchProductReviewsCountByUser(@Context() context: IContext): Promise<number> {
    const userId = context.req.user.id;
    return this.productReviewsService.countByUser({ userId });
  }

  //-------------------------- 생성 --------------------------//
  @HasRoles(ROLE.USER)
  @UseGuards(GqlAuthGuard('access'), RolesGuard)
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

  //-------------------------- 삭제 --------------------------//
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteProductReview(
    @Context() context: IContext,
    @Args('productReviewId') productReviewId: string, //
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return this.productReviewsService.delete({ productReviewId, userId });
  }
}
