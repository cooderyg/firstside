import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductCart } from 'src/apis/productCarts/entities/productCart.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { Store } from 'src/apis/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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
  nickname: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  refreshToken: string;

  @Column({ type: 'enum', enum: ROLE })
  @Field(() => ROLE)
  role: ROLE;

  @OneToOne(() => Store, (store) => store.user)
  @Field(() => Store)
  store: Store;

  @OneToOne(() => ProductCart, (productCart) => productCart.user, {
    cascade: true,
  })
  @Field(() => ProductCart)
  productCart: ProductCart;

  @OneToMany(() => ProductReview, (productReview) => productReview.user, {
    cascade: true,
  })
  @Field(() => [ProductReview])
  productReviews: ProductReview[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    cascade: true,
  })
  @Field(() => [Favorite])
  favorites: Favorite[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
