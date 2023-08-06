import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTransaction } from './entities/productTransaction.entity';
import { ProductTransactionsResolver } from './productTransactions.resolver';
import { ProductTransactionsService } from './productTransactions.service';
import { UsersModule } from '../users/users.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTransaction]), UsersModule, StoresModule],
  providers: [ProductTransactionsResolver, ProductTransactionsService],
  exports: [ProductTransactionsService],
})
export class ProductTransactionsModule {}
