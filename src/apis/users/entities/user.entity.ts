import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { ProductCart } from 'src/apis/productCarts/entities/productCart.entity';
import { ProductReview } from 'src/apis/productReviews/entities/productReview.entity';
import { Store } from 'src/apis/stores/entities/store.entity';
import {
  NumberValidator,
  StringValidator,
} from 'src/commons/decorators/validate.decorator';
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
  @StringValidator()
  id: string;

  @Column()
  @StringValidator()
  email: string;

  @Column()
  password: string;

  @Column()
  @StringValidator()
  nickname: string;

  @Column()
  @Min(1)
  @Max(120)
  @NumberValidator()
  age: number;

  @Column()
  @Field(() => Int)
  point: number;

  @Column({ nullable: true, name: 'refresh_token' })
  @IsString()
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

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
