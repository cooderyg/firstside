import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { ProductTransaction } from '../entities/productTransaction.entity';
import { StringValidator } from 'src/commons/decorators/validate.decorator';
import { IsString } from 'class-validator';

@InputType()
export class CreateProductTransactionInput extends PickType(ProductTransaction, [
  'amount',
  'pointAmount',
]) {
  @Field(() => [ProductInfoInput])
  productInfos: ProductInfoInput[];

  @StringValidator()
  storeId: string;

  @IsString()
  @Field(() => String, { nullable: true })
  impUid?: string;
}

@InputType()
export class ProductInfoInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  productName: string;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  isReviewed: boolean;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  size: string;

  @Field(() => String)
  color: string;
}
