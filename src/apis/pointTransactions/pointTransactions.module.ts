import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointTransactionsResolver } from './pointTransactions.resolver';
import { PointTransactionsService } from './pointTransactions.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from '../users/entities/user.entity';
import { IamportService } from '../iamport/iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointTransactionsResolver, //
    PointTransactionsService,
    IamportService,
  ],
})
export class PointsTransactionsModule {}
