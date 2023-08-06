import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ProductInfo {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

@Entity()
@ObjectType()
export class ProductCart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'simple-json', name: 'product_infos' })
  productInfos: ProductInfo[];

  @OneToOne(() => User, (user) => user.productCart, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt: Date;
}
