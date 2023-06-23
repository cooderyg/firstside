import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/product-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll({ page }): Promise<Product[]> {
    if (page) {
      // 페이지네이션 기능 구현하기
      return await this.productsRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.productCategory', 'productCategory')
        .orderBy('product.createdAt', 'DESC')
        .take(12)
        .skip((page - 1) * 12)
        .getMany();
    } else {
      return await this.productsRepository
        .createQueryBuilder('product')
        .innerJoinAndSelect('product.productCategory', 'productCategory')
        .orderBy('createdAt', 'DESC')
        .getMany();
    }
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
  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productCategoryId, ...product } = createProductInput;

    const result = await this.productsRepository.save({
      ...product,
      productCategory: {
        id: productCategoryId,
      },
    });
    return result;
  }
}
