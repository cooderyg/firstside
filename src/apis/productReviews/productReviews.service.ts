import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/productReview.entity';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewsRepository: Repository<ProductReview>,
  ) {}

  //조회 (리뷰 페이지네이션)
  async findByProductId({ productId, page }): Promise<ProductReview[]> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.productId = :productId', { productId })
      .orderBy('productReview.createdAt', 'DESC')
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
  }

  //조회 (리뷰 카운트)
  async countByProduct({ productId }): Promise<number> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.productId = :productId', { productId })
      .getCount();
  }

  async create({ createProductReviewInput, userId }): Promise<ProductReview> {
    const { content, star, productId } = createProductReviewInput;
    // 1. 결제테이블 만들면 일대일 관계만들고 결제내역자체로 확인해서 해당 유저가 리뷰작성 가능한지 검증하기

    // 2. 생성
    return await this.productReviewsRepository.save({
      content,
      star,
      product: { id: productId },
      user: { id: userId },
    });
  }

  // 삭제
  async delete({ productReviewId, userId }): Promise<boolean> {
    const productReview = await this.findById({ productReviewId });
    if (productReview.user.id !== userId) {
      throw new HttpException('삭제할 권한이 없습니다.', 401);
    }

    const result = await this.productReviewsRepository.softDelete({
      id: productReviewId,
    });
    return result.affected ? true : false;
  }

  // id로 찾기
  async findById({ productReviewId }): Promise<ProductReview> {
    return await this.productReviewsRepository.findOne({
      where: { id: productReviewId },
    });
  }
}
