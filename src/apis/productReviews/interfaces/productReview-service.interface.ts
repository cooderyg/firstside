import { CreateProductReviewInput } from '../dto/create-productReview.input';

export interface IProductReviewsServiceFindByProductId {
  productId: string;
  page: number;
}

export interface IProductReviewsServiceFindByUserId {
  userId: string;
  page: number;
}

export interface IProductReviewsServiceCountByProduct {
  productId: string;
}

export interface IProductReviewsServiceCountByUser {
  userId: string;
}

export interface IProductReviewsServiceCreate {
  createProductReviewInput: CreateProductReviewInput;
  userId: string;
}

export interface IProductReviewsServiceDelete {
  productReviewId: string;
  userId: string;
}

export interface IProductReviewsServiceFindById {
  productReviewId: string;
}
