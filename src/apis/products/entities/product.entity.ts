import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductImage } from 'src/apis/productImages/entities/product-image.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { ProductCategory } from 'src/apis/productCategories/entities/productCategory.entity';
import { Store } from 'src/apis/stores/entities/store.entity';
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

export class Stock {
  color?: string;
  size?: string;
  quantity: number;
}

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Min(1)
  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ type: 'simple-json' })
  @Field(() => [Stock])
  stock: Stock[];

  @Min(0)
  @Column({ default: 0, name: 'favorite_count' })
  @Field(() => Int)
  favoriteCount: number;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => Store, (store) => store.products)
  @Field(() => Store)
  store: Store;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  @Field(() => [ProductImage])
  productImages: ProductImage[];

  @OneToMany(() => ProductReview, (productReview) => productReview.product, {
    cascade: true,
  })
  @Field(() => [ProductReview])
  productReviews: ProductReview[];

  @OneToMany(() => Favorite, (favorite) => favorite.product, { cascade: true })
  @Field(() => [Favorite])
  favorites: Favorite[];

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) // 소프트삭제 graphql로는 boolean 값만 받음
  deletedAt: Date;
}
