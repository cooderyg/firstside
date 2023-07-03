import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { IFavoritesServiceCreate } from './interfaces/favorites-service.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async toggle({
    productId,
    userId,
  }: IFavoritesServiceCreate): Promise<string> {
    // 1. 이미 좋아요 누른 상품은 제외 어떻게 해야 광클 시 문제가 안생길지 고민해보기
    // 토글 시 생성 삭제
    // 1-1 해당 데이터 조회
    const favorite = await this.findFavoriteById({ productId, userId });
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    // 1-2 존재하면 삭제
    if (favorite) {
      this.favoritesRepository.delete({ id: favorite.id });
      this.productsRepository.save({
        id: productId,
        favoriteCount: product.favoriteCount - 1,
      });
      return '좋아요 삭제가 완료되었습니다.';
    } else {
      // 2. db에 저장하기
      this.favoritesRepository.save({
        product: { id: productId },
        user: { id: userId },
      });
      this.productsRepository.save({
        id: productId,
        favoriteCount: product.favoriteCount + 1,
      });
    }
    return '좋아요 생성이 완료되었습니다.';
  }

  findFavoriteById({ productId, userId }): Promise<Favorite> {
    return this.favoritesRepository
      .createQueryBuilder('favorite')
      .where('favorite.productId = :productId', { productId })
      .andWhere('favorite.userId = :userId', { userId })
      .getOne();
  }
}
