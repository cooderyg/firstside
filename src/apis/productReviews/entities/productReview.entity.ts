import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min, isString } from 'class-validator';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => Int)
  star: number;

  //이미지 만들고 url칼럼넣기
  @ManyToOne(() => User, (user) => user.productReviews, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.productReviews, {
    onDelete: 'CASCADE',
  })
  @Field(() => Product)
  product: Product;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
