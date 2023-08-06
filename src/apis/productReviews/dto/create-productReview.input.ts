import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { ProductInfo } from 'src/apis/productTransactions/entities/productTransaction.entity';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class CreateProductReviewInput {
  @StringValidator()
  contents: string;

  @Min(1)
  @Max(5)
  @Field(() => Int)
  score: number;

  @Field(() => ProductInfo)
  productInfo: ProductInfo;

  @StringValidator()
  productTransactionId: string;
}
