import { Field, InputType } from '@nestjs/graphql';
import { IsArray, Min } from 'class-validator';
import { NumberValidator, StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
class StockInput {
  @StringValidator()
  color: string;

  @StringValidator()
  size: string;

  @NumberValidator()
  quantity: number;
}

@InputType()
export class CreateProductInput {
  @StringValidator()
  name: string;

  @StringValidator()
  description: string;

  @Min(0)
  @NumberValidator()
  price: number;

  @StringValidator()
  productCategoryId: string;

  @StringValidator()
  storeId: string;

  @IsArray()
  @Field(() => [String])
  imageUrls: string[];

  @IsArray()
  @Field(() => [StockInput])
  stock: StockInput[];
}
