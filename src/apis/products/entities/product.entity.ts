import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductCart } from 'src/apis/productCarts/entities/productCart.entity';
import { ProductImage } from 'src/apis/productImages/entities/product-image.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldOut: boolean;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User, (user) => user.products)
  @Field(() => User)
  user: User;

  @OneToMany(
    () => ProductCart,
    (productCart) => productCart.product, //
    { cascade: true },
  )
  @Field(() => [ProductCart])
  productCarts: ProductCart[];

  @OneToMany(
    () => ProductImage, //
    (productImage) => productImage.product,
  )
  @Field(() => [ProductImage])
  productImages: ProductImage[];

  @OneToMany(
    () => ProductReview, //
    (productReview) => productReview.product,
    { cascade: true },
  )
  @Field(() => [ProductReview])
  productReviews: ProductReview[];

  @OneToMany(
    () => Favorite, //
    (favorite) => favorite.product,
    { cascade: true },
  )
  @Field(() => [Favorite])
  favorites: Favorite[];

  @Column({ default: 0, name: 'favorite_count' })
  @Field(() => Int)
  favoriteCount: number;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) // 소프트삭제 graphql로는 boolean 값만 받음
  deletedAt: Date;
}
