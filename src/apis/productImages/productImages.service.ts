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

  async createMany({ imageUrls, productId }: IProductImagesServiceCreate) {
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
    await this.productImagesRepository.insert(temp);
  }

  async delete({
    productImageId,
  }: IProdcutImagesServiceDelete): Promise<boolean> {
    const result = await this.productImagesRepository.softDelete({
      id: productImageId,
    });
    return result.affected ? true : false;
  }

  // async upsert({ images, productId }) {
  //   const temp: ProductImage[] = [];
  //   images.forEach((images: string) => {
  //     const productImage = this.productImagesRepository.create({
  //       ...images
  //       product: {
  //         id: productId,
  //       },
  //     });
  //     temp.push(productImage);
  //   });
  //   await this.productImagesRepository
  //     .createQueryBuilder()
  //     .insert()
  //     .into(ProductImage)
  //     .values(temp)
  //     .orUpdate(['id'], ['url'])
  //     .execute();
  // }
}

interface IProductImagesServiceCreate {
  imageUrls: string[];
  productId: string;
}
interface IProdcutImagesServiceDelete {
  productImageId: string;
}
