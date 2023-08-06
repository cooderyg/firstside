import { EntityManager } from 'typeorm';
import { CreateStoreInput } from '../dto/create-store.dto';
import { Store } from '../entities/store.entity';

export interface IStoresServiceCreateStore {
  createStoreInput: CreateStoreInput;
  userId: string;
}

export interface IStoresServiceFindByUserId {
  userId: string;
}

export interface IStoresServiceFindByIdWithManager {
  manager: EntityManager;
  storeId: string;
}

export interface IStoresServiceUpdateSalesWithManager {
  manager: EntityManager;
  store: Store;
  totalAmount: number;
}
