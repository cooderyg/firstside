import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCart } from './entities/productCart.entity';
import { ProductCartsResolver } from './productCarts.resolver';
import { ProductCartsSerivce } from './productCarts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCart])],
  providers: [ProductCartsResolver, ProductCartsSerivce],
})
export class ProductCartsModule {}
