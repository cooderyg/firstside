import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.reslover';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
