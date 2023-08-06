import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { Repository } from 'typeorm';
import { IProductCategoryCreate } from './interfaces/productCategories-service.interface';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({});
  }

  create({ name }: IProductCategoryCreate): Promise<ProductCategory> {
    return this.productCategoryRepository.save({ name });
  }
}
