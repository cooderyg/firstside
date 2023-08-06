import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { User } from 'src/apis/users/entities/user.entity';
import { NumberValidator, StringValidator } from 'src/commons/decorators/validate.decorator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PRODUCT_TRANSACTION_STATUS {
  PAYMENT = 'PAYMENT',
  DELIVERY = 'DELIVERY',
  CANCEL = 'CANCEL',
  COMPLETE = 'COMPLETE',
  RETURN = 'RETURN',
}

registerEnumType(PRODUCT_TRANSACTION_STATUS, {
  name: 'PRODUCT_TRANSACTION_STATUS',
});

export class ProductInfo {
  productId: string;
  productName: string;
  isReviewed: boolean;
  size?: number;
  color?: string;
}

@Entity()
@ObjectType()
export class ProductTransaction {
  @PrimaryGeneratedColumn('uuid')
  @StringValidator()
  id: string;

  @Column()
  @NumberValidator()
  amount: number;

  @Column({ name: 'point_amount' })
  @NumberValidator()
  pointAmount: number;

  @Column({ nullable: true, name: 'imp_uid' }) // 포인트로만 결제일 때에는 null
  @IsString()
  @Field(() => String, { nullable: true })
  impUid: string;

  @Column({ type: 'simple-json', name: 'product_infos' })
  @IsArray()
  @Field(() => [ProductInfo])
  productInfos: ProductInfo[];

  @Column({
    type: 'enum',
    enum: PRODUCT_TRANSACTION_STATUS,
    default: PRODUCT_TRANSACTION_STATUS.PAYMENT,
  })
  @IsEnum(PRODUCT_TRANSACTION_STATUS)
  @Field(() => PRODUCT_TRANSACTION_STATUS)
  status: PRODUCT_TRANSACTION_STATUS;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;
}
