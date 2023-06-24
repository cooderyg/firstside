import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @OneToMany(() => ProductReview, (productReview) => productReview.user, {
    cascade: true,
  })
  @Field(() => [ProductReview])
  productReviews: ProductReview[];

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
  })
  @Field(() => [Product])
  products: Product[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    cascade: true,
  })
  @Field(() => [Favorite])
  favorites: Favorite[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
