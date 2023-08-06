import { Field, InputType } from '@nestjs/graphql';
import { StringValidator } from 'src/commons/decorators/validate.decorator';
import { ProductInfoInput } from 'src/apis/productTransactions/dto/create-productTransactions.dto';

@InputType()
export class UpdateProductCartInput {
  @Field(() => [ProductInfoInput])
  productInfos: ProductInfoInput[];

  @StringValidator()
  productCartId: string;
}
