import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IStoresServiceCreateStore,
  IStoresServiceFindByIdWithManager,
  IStoresServiceFindByUserId,
  IStoresServiceUpdateSalesWithManager,
} from './interfaces/store-service.interface';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async createStore({ createStoreInput, userId }: IStoresServiceCreateStore): Promise<Store> {
    const { name } = createStoreInput;
    const store = await this.findByUserId({ userId });
    if (store) throw new ConflictException('이미 가게를 생성한 셀러입니다.');
    return await this.storesRepository.save({
      name,
      user: { id: userId },
    });
  }

  async findByUserId({ userId }: IStoresServiceFindByUserId): Promise<Store> {
    return await this.storesRepository.findOneBy({ user: { id: userId } });
  }
  async findByIdWithManager({
    manager,
    storeId,
  }: IStoresServiceFindByIdWithManager): Promise<Store> {
    return await manager.findOne(Store, {
      where: { id: storeId },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async updateSalesWithManager({
    manager,
    store,
    totalAmount,
  }: IStoresServiceUpdateSalesWithManager): Promise<void> {
    await manager.save(Store, {
      ...store,
      sales: store.sales + totalAmount,
    });
  }
}
