import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async create({
    productId,
    userId,
  }: IFavoritesServiceCreate): Promise<string> {
    // 1. 이미 좋아요 누른 상품은 제외 어떻게 해야 광클 시 문제가 안생길지 고민해보기
    // 토글 시 생성 삭제
    // 1-1 해당 데이터 조회
    const favorite = await this.findFavoriteById({ productId, userId });

    // 1-2 존재하면 삭제
    if (favorite) {
      this.favoritesRepository.delete({ id: favorite.id });
      return '좋아요 삭제가 완료되었습니다.';
    }

    // 2. db에 저장하기
    await this.favoritesRepository.save({
      product: { id: productId },
      user: { id: userId },
    });
    return '좋아요 생성이 완료되었습니다.';
  }

  async findFavoriteById({ productId, userId }): Promise<Favorite> {
    return await this.favoritesRepository.findOne({
      where: {
        // and 조건 or 조건은 []안에 담으면 가능
        product: { id: productId },
        user: { id: userId },
      },
    });
  }
}

interface IFavoritesServiceCreate {
  productId: string;
  userId: string;
}
