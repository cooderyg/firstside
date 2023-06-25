import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsCategoriesService } from './productsCategories.service';
import { ProductCategory } from './entities/productCategory.entity';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}
  //-------------------------- 조회 --------------------------//
  @Query(() => [ProductCategory])
  fetchProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesService.findAll();
  }

  //-------------------------- 생성 --------------------------//
  @Mutation(() => ProductCategory)
  createProductCategory(@Args('name') name: string): Promise<ProductCategory> {
    return this.productCategoriesService.create({ name });
  }
}
