import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction, POINT_TRANSACTION_STATUS } from './entities/pointTransaction.entity';
import {
  IPointTransactionsServiceCancel,
  IPointTransactionsServiceCheckAlreadyCanceled,
  IPointTransactionsServiceCheckDuplication,
  IPointTransactionsServiceCheckHasCancelablePoint,
  IPointTransactionsServiceCreate,
  IPointTransactionsServiceCreateForPayment,
  IPointTransactionsServiceFindByImpUidAndUser,
  IPointTransactionsServiceFindOneByImpUid,
} from './interfaces/points-transactions-service.interface';
import { IamportService } from '../iamport/iamport.service';

@Injectable()
export class PointTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly iamportService: IamportService,
  ) {}

  findOneByImpUid({ impUid }: IPointTransactionsServiceFindOneByImpUid): Promise<PointTransaction> {
    return this.pointTransactionsRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({ impUid }: IPointTransactionsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointTransactionsServiceCreate): Promise<PointTransaction> {
    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
    });
    await this.pointTransactionsRepository.save(pointTransaction);

    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 3. 유저의 돈 업데이트

    await this.usersRepository.update({ id: _user.id }, { point: user.point + amount });

    // 4. 최종결과 브라우저에 돌려주기
    return pointTransaction;
  }

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPointTransactionsServiceCreateForPayment): Promise<PointTransaction> {
    await this.iamportService.checkPaid({ impUid, amount }); // 결제완료 상태인지 검증하기
    await this.checkDuplication({ impUid }); // 이미 결제됐던 id인지 검증하기

    return this.create({ impUid, amount, user });
  }

  findByImpUidAndUser({
    impUid,
    user,
  }: IPointTransactionsServiceFindByImpUidAndUser): Promise<PointTransaction[]> {
    return this.pointTransactionsRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  checkAlreadyCanceled({ pointTransactions }: IPointTransactionsServiceCheckAlreadyCanceled): void {
    const canceledPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS.CANCEL,
    );
    if (canceledPointTransactions.length)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  checkHasCancelablePoint({
    pointTransactions,
  }: IPointTransactionsServiceCheckHasCancelablePoint): void {
    const paidPointTransactions = pointTransactions.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS.PAYMENT,
    );
    if (!paidPointTransactions.length)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }

  async cancel({ impUid, user }: IPointTransactionsServiceCancel): Promise<PointTransaction> {
    const pointTransactions = await this.findByImpUidAndUser({ impUid, user }); // 결제내역 조회하기
    this.checkAlreadyCanceled({ pointTransactions }); // 이미 취소됐던 id인지 검증하기
    this.checkHasCancelablePoint({ pointTransactions }); // 포인트가 취소하기에 충분히 있는지 검증하기

    // 결제 취소하기
    const canceledAmount = await this.iamportService.cancel({ impUid });

    // 취소된 결과 등록하기
    return this.create({
      impUid,
      amount: -canceledAmount,
      user,
      status: POINT_TRANSACTION_STATUS.CANCEL,
    });
  }
}
