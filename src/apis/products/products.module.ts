import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.reslover';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from '../productImages/entities/product-image.entity';
import { ProductImagesService } from '../productImages/productImages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  providers: [ProductsResolver, ProductsService, ProductImagesService],
})
export class ProductsModule {}
