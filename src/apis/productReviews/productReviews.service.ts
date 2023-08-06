import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/productReview.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IProductReviewsServiceCountByProduct,
  IProductReviewsServiceCountByUser,
  IProductReviewsServiceCreate,
  IProductReviewsServiceDelete,
  IProductReviewsServiceFindById,
  IProductReviewsServiceFindByProductId,
  IProductReviewsServiceFindByUserId,
} from './interfaces/productReview-service.interface';
import { ProductTransactionsService } from '../productTransactions/productTransactions.service';

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewsRepository: Repository<ProductReview>,
    private readonly productTransactionsService: ProductTransactionsService,
  ) {}

  //조회 (리뷰 제품별 페이지네이션)
  async findByProductId({
    productId,
    page,
  }: IProductReviewsServiceFindByProductId): Promise<ProductReview[]> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.productId = :productId', { productId })
      .orderBy('productReview.createdAt', 'DESC')
      .take(5)
      .skip((page - 1) * 5)
      .getMany();
  }

  //조회 (리뷰 유저별 페이지네이션)
  async findByUserId({
    userId,
    page,
  }: IProductReviewsServiceFindByUserId): Promise<ProductReview[]> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.userId = :userId', { userId })
      .orderBy('productReview.createdAt', 'DESC')
      .take(10)
      .skip((page - 1) * 10)
      .getMany();
  }

  //조회 (리뷰 제품별 카운트)
  async countByProduct({ productId }: IProductReviewsServiceCountByProduct): Promise<number> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.productId = :productId', { productId })
      .getCount();
  }

  //조회 (리뷰 유저별 카운트)
  async countByUser({ userId }: IProductReviewsServiceCountByUser): Promise<number> {
    return await this.productReviewsRepository
      .createQueryBuilder('productReview')
      .where('productReview.userId = :userId', { userId })
      .getCount();
  }

  async create({
    createProductReviewInput,
    userId,
  }: IProductReviewsServiceCreate): Promise<ProductReview> {
    const { contents, score, productInfo, productTransactionId } = createProductReviewInput;
    // 1. 결제테이블 결제내역자체로 확인해서 해당 유저가 리뷰작성 가능한지 검증하기
    const productTransaction = await this.productTransactionsService.findById({
      id: productTransactionId,
    });
    const foundInfos = productTransaction.productInfos;
    let InfoIndex: number;
    const filteredInfo = foundInfos.map((foundInfo, index) => {
      if (
        foundInfo.productId === productInfo.productId &&
        foundInfo.color === productInfo.color &&
        foundInfo.size === productInfo.size
      ) {
        InfoIndex = index;
        return foundInfo;
      }
    });
    if (!filteredInfo.length)
      throw new NotFoundException('해당하는 주문이 없거나 상품정보가 잘못되었습니다.');
    if (filteredInfo[0].isReviewed)
      throw new ConflictException('이미 리뷰가 작성된 주문제품입니다.');

    productTransaction.productInfos[InfoIndex].isReviewed = true;
    await this.productTransactionsService.updateReviewed({ productTransaction });
    // 2. 생성
    return await this.productReviewsRepository.save({
      contents,
      score,
      product: { id: productInfo.productId },
      user: { id: userId },
    });
  }

  // 삭제
  async delete({ productReviewId, userId }: IProductReviewsServiceDelete): Promise<boolean> {
    const productReview = await this.findById({ productReviewId });
    if (productReview.user.id !== userId) {
      throw new UnauthorizedException('삭제할 권한이 없습니다.');
    }
    const result = await this.productReviewsRepository.softDelete({
      id: productReviewId,
    });
    return result.affected ? true : false;
  }

  // id로 찾기
  async findById({ productReviewId }: IProductReviewsServiceFindById): Promise<ProductReview> {
    return await this.productReviewsRepository.findOne({
      where: { id: productReviewId },
    });
  }
}
