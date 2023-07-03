import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductImagesService } from './productImages.service';

@Resolver()
export class ProductImagesResolver {
  constructor(private readonly productImagesService: ProductImagesService) {}
  @Mutation()
  deleteProductImage(
    @Args('productImageId') productImageId: string,
  ): Promise<boolean> {
    return this.productImagesService.delete({ productImageId });
  }
}
