import { CreateProductTransactionInput } from '../dto/create-productTransactions.dto';
import {
  PRODUCT_TRANSACTION_STATUS,
  ProductTransaction,
} from '../entities/productTransaction.entity';

export interface ICreateProductTransaction {
  createProductTransactionInput: CreateProductTransactionInput;
  userId: string;
}

export interface IProductTransactionsServiceUpdateStatus {
  status: PRODUCT_TRANSACTION_STATUS;
  id: string;
}

export interface IProductTransctionsServiceUpdateReviewed {
  productTransaction: ProductTransaction;
}
