import { ProductInfo } from '../entities/productCart.entity';

export interface IProductCartsServiceCreate {
  userId: string;
  productId: string;
  quantity: number;
}

export interface IProductCartsServiceUpdate {
  userId: string;
  productCartId: string;
  productInfos: ProductInfo[];
}

export interface IProductCartsServiceDelete {
  userId: string;
  productCartId: string;
}

export interface IProductCartsServiceFindByUserAndProduct {
  userId: string;
  productId: string;
}

export interface IProductCartsServiceFindByUser {
  userId: string;
}
