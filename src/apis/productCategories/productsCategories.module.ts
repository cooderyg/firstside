import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoriesResolver } from './productsCategories.resolver';
import { ProductCategoriesService } from './productsCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategory]), //
  ],
  providers: [
    ProductCategoriesResolver, //
    ProductCategoriesService,
  ],
})
export class ProductCategoriesModule {}
