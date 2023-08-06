import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Max(5)
  @Min(1)
  @Column()
  @Field(() => Int)
  score: number;

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

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
