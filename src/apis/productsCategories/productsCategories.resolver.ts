import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsCategoriesService } from './productsCategories.service';
import { ProductCategory } from './entities/productCategory.entity';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}

  @Query(() => [ProductCategory])
  fetchProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesService.findAll();
  }
  @Mutation(() => ProductCategory)
  createProductCategory(@Args('name') name: string): Promise<ProductCategory> {
    return this.productCategoriesService.create({ name });
  }
}
