import { IAuthUser } from 'src/commons/interfaces/context';
import {
  POINT_TRANSACTION_STATUS,
  PointTransaction,
} from '../entities/pointTransaction.entity';

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
  impUid: string;
  amount: number;
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
  impUid: string;
  user: IAuthUser['user'];
}
