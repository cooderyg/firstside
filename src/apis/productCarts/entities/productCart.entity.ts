import { Field, Int, ObjectType } from '@nestjs/graphql';
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
export class ProductCart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 1 })
  @Field(() => Int)
  quantity: number;

  @ManyToOne(
    () => User,
    (user) => user.productCarts, //
    { onDelete: 'CASCADE' },
  )
  @Field(() => User)
  user: User;

  @ManyToOne(
    () => Product,
    (product) => product.productCarts, //
    { onDelete: 'CASCADE' },
  )
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
