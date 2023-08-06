import { Field, InputType } from '@nestjs/graphql';
import { NumberValidator, StringValidator } from 'src/commons/decorators/validate.decorator';
import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class ProductInfoInput {
  @StringValidator()
  productId: string;

  @StringValidator()
  productName: string;

  @NumberValidator()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  isReviewed: boolean;

  @NumberValidator()
  quantity: number;

  @StringValidator()
  size: string;

  @StringValidator()
  color: string;
}

@InputType()
export class CreateProductTransactionInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [ProductInfoInput])
  @Type(() => ProductInfoInput)
  productInfos: ProductInfoInput[];

  @StringValidator()
  storeId: string;

  @NumberValidator()
  amount: number;

  @NumberValidator()
  pointAmount: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  impUid?: string;
}
