import { Field, ObjectType } from '@nestjs/graphql';
import { Favorite } from 'src/apis/favorites/entities/favorites.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  @Field(() => [Favorite])
  favorites: Favorite[];
}
