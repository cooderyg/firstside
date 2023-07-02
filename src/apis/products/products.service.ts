import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/product-service.interface';
import { ProductImagesService } from '../productImages/productImages.service';
import { ProductImage } from '../productImages/entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async findAll({ page }): Promise<Product[]> {
    return await this.productsRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.productCategory', 'productCategory')
      .orderBy('product.createdAt', 'DESC')
      .take(12)
      .skip((page - 1) * 12)
      .getMany();
  }

  // 조회할 때 favorites 배열이 담김 이걸 count만 할 수 있는 방법 찾기
  // 배열 length 로 카운트하는 건 비효율적인 것 같읍..
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.productCategory', 'productCategory')
      .where('product.id = :id', { id: productId })
      .getOne();
  }

  // 전체개수 카운팅
  count(): Promise<number> {
    return this.productsRepository.createQueryBuilder('product').getCount();
  }

  // 제품등록
  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productCategoryId, imageUrls, ...product } = createProductInput;

    const result = await this.productsRepository.save({
      ...product,
      productCategory: {
        id: productCategoryId,
      },
    });
    // console.log(`result :${result.id}`);

    await this.productImagesService.create({
      imageUrls,
      productId: result.id,
    });

    return result;
  }

  // 제품삭제
  async delete({ productId, userId }): Promise<boolean> {
    const product = await this.findOne({ productId });
    if (product.id !== userId) {
      throw new HttpException('삭제할 권한이 없습니다.', 401);
    }

    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
