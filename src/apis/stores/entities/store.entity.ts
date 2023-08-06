import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { StringValidator } from 'src/commons/decorators/validate.decorator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 0 })
  @Field(() => Int)
  sales: number;

  @Column()
  @StringValidator()
  name: string;

  @OneToOne(() => User, (user) => user.store)
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToMany(() => Product, (product) => product.store)
  @Field(() => [Product])
  products: Product[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
