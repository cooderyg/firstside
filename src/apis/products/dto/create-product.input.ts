import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, Min, ValidateNested } from 'class-validator';
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
  @ValidateNested({ each: true })
  @Field(() => [String])
  imageUrls: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockInput)
  @Field(() => [StockInput])
  stock: StockInput[];
}
