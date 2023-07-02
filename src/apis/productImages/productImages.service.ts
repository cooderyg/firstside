import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
  ) {}

  async create({ imageUrls, productId }: IProductImagesServiceCreate) {
    console.log(`result: ${productId}`);
    const temp: ProductImage[] = [];
    imageUrls.forEach((imageUrl) => {
      const productImage = this.productImagesRepository.create({
        url: imageUrl,
        product: {
          id: productId,
        },
      });
      temp.push(productImage);
    });
    console.log(temp);
    await this.productImagesRepository.insert(temp);
  }
}

interface IProductImagesServiceCreate {
  imageUrls: string[];
  productId: string;
}
