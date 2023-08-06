import { Field, InputType, Int } from '@nestjs/graphql';
import { NumberValidator, StringValidator } from 'src/commons/decorators/validate.decorator';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateProductTransactionInput {
  @IsArray()
  @Field(() => [ProductInfoInput])
  productInfos: ProductInfoInput[];

  @StringValidator()
  storeId: string;

  @NumberValidator()
  amount: number;

  @NumberValidator()
  pointAmount: number;

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
