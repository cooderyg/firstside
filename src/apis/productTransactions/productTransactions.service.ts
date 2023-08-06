import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  PRODUCT_TRANSACTION_STATUS,
  ProductTransaction,
} from './entities/productTransaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { StoresService } from '../stores/stores.service';
import {
  ICreateProductTransaction,
  IProductTransactionsServiceUpdateStatus,
  IProductTransctionsServiceUpdateReviewed,
} from './interfaces/productTransaction-service.interface';

@Injectable()
export class ProductTransactionsService {
  constructor(
    @InjectRepository(ProductTransaction)
    private readonly productTransactionsRepository: Repository<ProductTransaction>,
    private readonly usersService: UsersService,
    private readonly storesService: StoresService,
    private readonly dataSource: DataSource,
  ) {}
  async createProductTransaction({
    createProductTransactionInput,
    userId,
  }: ICreateProductTransaction): Promise<ProductTransaction> {
    const { amount, pointAmount, impUid, storeId } = createProductTransactionInput;

    if (impUid) {
      const isExist = await this.productTransactionsRepository.findOne({ where: { impUid } });
      if (isExist) throw new ConflictException('이미 존재하는 주문입니다.');
    }

    const user = await this.usersService.findById({ id: userId });
    if (user.point < pointAmount) throw new ConflictException('포인트 잔액이 부족합니다.');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    try {
      if (pointAmount) {
        await this.usersService.updatePointWithManager({ manager, pointAmount, user });
      }
      const totalAmount = amount + pointAmount;
      const store = await this.storesService.findByIdWithManager({ manager, storeId });

      // TODO: 재고업데이트 생각해보기

      await this.storesService.updateSalesWithManager({ manager, store, totalAmount });
      return this.productTransactionsRepository.save({
        ...createProductTransactionInput,
        user: { id: userId },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, error.status || 500);
    } finally {
      await queryRunner.release();
    }
  }

  async findById({ id }): Promise<ProductTransaction> {
    return await this.productTransactionsRepository.findOne({ where: { id } });
  }

  async updateStatus({ status, id }: IProductTransactionsServiceUpdateStatus) {
    const productTransaction = await this.findById({ id });
    if (status === productTransaction.status)
      throw new ConflictException('이미 해당상태로 변경되었습니다.');
    if (status === PRODUCT_TRANSACTION_STATUS.CANCEL) {
      if (
        productTransaction.status === PRODUCT_TRANSACTION_STATUS.COMPLETE ||
        productTransaction.status === PRODUCT_TRANSACTION_STATUS.DELIVERY
      ) {
        throw new ConflictException('주문취소 가능상태가 아닙니다.');
      }
    }
    return await this.productTransactionsRepository.save({
      id,
      status,
    });
  }

  async updateReviewed({
    productTransaction,
  }: IProductTransctionsServiceUpdateReviewed): Promise<void> {
    await this.productTransactionsRepository.save({
      ...productTransaction,
    });
  }
}
