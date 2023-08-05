import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductCart } from 'src/apis/productCarts/entities/productCart.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ROLE {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  USER = 'USER',
}

registerEnumType(ROLE, { name: 'ROLE' });

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

  @Column({ type: 'enum', enum: ROLE })
  @Field(() => ROLE)
  role: ROLE;

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

  @OneToMany(
    () => ProductCart,
    (productCart) => productCart.user, //
    { cascade: true },
  )
  @Field(() => [ProductCart])
  productCarts: ProductCart[];

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
