import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { ProductCart } from './entities/productCart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IProductCartsServiceCreate,
  IProductCartsServiceDelete,
  IProductCartsServiceFindByUser,
  IProductCartsServiceFindByUserAndProduct,
  IProductCartsServiceUpdate,
} from './interfaces/productCarts-service.interface';

@Injectable()
export class ProductCartsSerivce {
  constructor(
    @InjectRepository(ProductCart)
    private readonly productCartsRepository: Repository<ProductCart>,
  ) {}

  async create({
    userId,
    productId,
    quantity,
  }: IProductCartsServiceCreate): Promise<ProductCart> {
    const isExisted = await this.findByUserAndProduct({ userId, productId });

    if (isExisted) throw new ConflictException('이미 생성된 카트입니다.');

    return await this.productCartsRepository.save({
      quantity,
      user: { id: userId },
      product: { id: productId },
    });
  }

  async update({
    userId,
    productCartId,
    quantity,
  }: IProductCartsServiceUpdate): Promise<string> {
    const result = await this.productCartsRepository
      .createQueryBuilder('productCart')
      .update()
      .set({ quantity })
      .where('id = :id', { id: productCartId })
      .andWhere('userId = :userId', { userId })
      .execute();

    if (!result.affected)
      throw new HttpException('업데이트할 권한이 없습니다.', 401);
    return '업데이트가 완료되었습니다.';
  }

  async delete({
    userId,
    productCartId,
  }: IProductCartsServiceDelete): Promise<string> {
    const result = await this.productCartsRepository
      .createQueryBuilder('productCart')
      .delete()
      .where('id = :id', { id: productCartId })
      .andWhere('userId = :userId', { userId })
      .execute();

    if (!result.affected) {
      throw new HttpException('삭제할 권한이 없습니다.', 401);
    }
    return '성공적으로 삭제했습니다.';
  }

  // find
  async findByUserAndProduct({
    userId,
    productId,
  }: IProductCartsServiceFindByUserAndProduct): Promise<ProductCart> {
    return await this.productCartsRepository
      .createQueryBuilder('productCart')
      .leftJoinAndSelect('productCart.product', 'product')
      .leftJoinAndSelect('productCart.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('product.id = :productId', { productId })
      .getOne();
  }

  // 가격 구해서 칼럼하나만들어서 리턴하게하기
  async findByUser({
    userId,
  }: IProductCartsServiceFindByUser): Promise<ProductCart[]> {
    return await this.productCartsRepository
      .createQueryBuilder('productCart')
      .leftJoinAndSelect('productCart.user', 'user')
      .leftJoinAndSelect('productCart.product', 'product')
      .leftJoinAndSelect('product.productImages', 'productImage')
      .where('productCart.userId = :userId', { userId })
      .orderBy('productCart.createdAt', 'DESC')
      .getMany();
  }
}
