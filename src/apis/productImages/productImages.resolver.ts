import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductImagesService } from './productImages.service';
import { DeleteProductImageInput } from './dto/delete-productImage.dto';

@Resolver()
export class ProductImagesResolver {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Mutation()
  deleteProductImage(
    @Args('deleteProductImageInput') deleteProductImageInput: DeleteProductImageInput,
  ): Promise<boolean> {
    return this.productImagesService.delete({ deleteProductImageInput });
  }
}
