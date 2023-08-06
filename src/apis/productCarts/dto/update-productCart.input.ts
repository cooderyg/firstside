import { Field, InputType } from '@nestjs/graphql';
import { StringValidator } from 'src/commons/decorators/validate.decorator';
import { ProductInfoInput } from 'src/apis/productTransactions/dto/create-productTransactions.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateProductCartInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [ProductInfoInput])
  @Type(() => ProductInfoInput)
  productInfos: ProductInfoInput[];

  @StringValidator()
  productCartId: string;
}
