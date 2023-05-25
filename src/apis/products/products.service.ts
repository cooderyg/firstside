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

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productCategory'],
    });
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productCategoryId, ...product } = createProductInput;
    console.log(createProductInput);
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
