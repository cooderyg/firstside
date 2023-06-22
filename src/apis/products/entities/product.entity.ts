import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
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
  @Field(() => String)
  description: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldOut: boolean;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  @Field(() => [Favorite])
  favorites: Favorite[];

  @Column({ default: 0 })
  @Field(() => Int)
  favoriteCount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn() // 소프트삭제 graphql로는 boolean 값만 받음
  deletedAt: Date;
}
