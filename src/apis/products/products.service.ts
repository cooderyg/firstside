import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll({ page }): Promise<Product[]> {
    if (page) {
      // 페이지네이션 기능 구현하기
      // return await this.productsRepository.find({
      //   take: 12, // 가져올 product 수(페이지 당 product 수)
      //   skip: (page - 1) * 12, // 넘길 페이지
      //   relations: ['productCategory'], // ['productCategory', 'favorites'],
      //   order: { createdAt: 'DESC' }, // 내림차순으로 정렬
      // });
      // queryBuilder로 변경
      return await this.productsRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.favorites', 'favorites')
        .loadRelationCountAndMap('product.favoriteCount', 'product.favorites')
        .orderBy('product.createdAt', 'DESC')
        .take(12)
        .skip((page - 1) * 12)
        .getMany();
    } else {
      // return await this.productsRepository.find({
      //   relations: ['productCategory'], // ['productCategory', 'favorites'],
      //   order: { createdAt: 'DESC' }, // 내림차순으로 정렬
      // });
      // queryBuilder로 변경
      return await this.productsRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.favorites', 'favorites')
        .loadRelationCountAndMap('product.favoriteCount', 'product.favorites')
        .orderBy('createdAt', 'DESC')
        .getMany();
    }
  }
  // 조회할 때 favorites 배열이 담김 이걸 count만 할 수 있는 방법 찾기
  // 배열 length 로 카운트하는 건 비효율적인 것 같읍..
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    // return this.productsRepository.findOne({
    //   where: { id: productId },
    //   relations: ['productCategory', 'favorites'],
    // });
    // queryBuilder로 변경
    return this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.favorites', 'favorites')
      .loadRelationCountAndMap('product.favoriteCount', 'product.favorites')
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

interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

interface IProductsServiceFindOne {
  productId: string;
}
