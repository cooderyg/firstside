import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS, {
  name: 'POINT_TRANSACTION_STATUS',
});

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({
    type: 'enum',
    enum: POINT_TRANSACTION_STATUS,
    default: POINT_TRANSACTION_STATUS.PAYMENT,
  })
  @Field(() => POINT_TRANSACTION_STATUS)
  status: POINT_TRANSACTION_STATUS;

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
