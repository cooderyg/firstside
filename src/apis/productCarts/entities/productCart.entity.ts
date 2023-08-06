import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class ProductInfo {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  productName: string;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  isReviewed: boolean;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  size: string;

  @Field(() => String)
  color: string;
}

@Entity()
@ObjectType()
export class ProductCart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'simple-json', name: 'product_infos' })
  @Field(() => [ProductInfo])
  productInfos: ProductInfo[];

  @OneToOne(() => User, (user) => user.productCart, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;
}
