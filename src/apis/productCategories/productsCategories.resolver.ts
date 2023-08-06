import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoriesService } from './productsCategories.service';
import { ProductCategory } from './entities/productCategory.entity';
import { CreateProductCategoryInput } from './dto/create-productCategory.input';

@Resolver()
export class ProductCategoriesResolver {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}
  //-------------------------- 조회 --------------------------//
  @Query(() => [ProductCategory])
  fetchProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesService.findAll();
  }

  //-------------------------- 생성 --------------------------//
  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('createProductCategoryInput') createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.create({ createProductCategoryInput });
  }
}
