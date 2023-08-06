import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { ProductInfoInput } from 'src/apis/productTransactions/dto/create-productTransactions.dto';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class CreateProductReviewInput {
  @StringValidator()
  contents: string;

  @Min(1)
  @Max(5)
  @Field(() => Int)
  score: number;

  @Field(() => ProductInfoInput)
  productInfo: ProductInfoInput;

  @StringValidator()
  productTransactionId: string;
}
