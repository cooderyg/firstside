import { Module } from '@nestjs/common';
import { ProductReview } from './entities/productReview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewsResolver } from './productReviews.resolver';
import { ProductReviewsService } from './productReviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  providers: [ProductReviewsResolver, ProductReviewsService],
})
export class ProductReviewsModule {}
