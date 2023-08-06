import { IAuthUser } from 'src/commons/interfaces/context';
import { POINT_TRANSACTION_STATUS, PointTransaction } from '../entities/pointTransaction.entity';
import { CreatePointTransactionInput } from '../dto/create-pointTrasaction.input';
import { CancelPointTransactionInput } from '../dto/cancel-pointTransaction.input';

export interface IPointTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointTransactionsServiceCheckDuplication {
  impUid: string;
}

export interface IPointTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  status?: POINT_TRANSACTION_STATUS;
}

export interface IPointTransactionsServiceCreateForPayment {
  createPointTransactionInput: CreatePointTransactionInput;
  user: IAuthUser['user'];
}

export interface IPointTransactionsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPointTransactionsServiceCheckAlreadyCanceled {
  pointTransactions: PointTransaction[];
}

export interface IPointTransactionsServiceCheckHasCancelablePoint {
  pointTransactions: PointTransaction[];
}

export interface IPointTransactionsServiceCancel {
  cancelPointTransactionInput: CancelPointTransactionInput;
  user: IAuthUser['user'];
}
