import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateProductReviewInput {
  @Field(() => String)
  content: string;

  @Min(1)
  @Max(5)
  @Field(() => Int)
  star: number;

  @Field(() => String)
  productId: string;
}
