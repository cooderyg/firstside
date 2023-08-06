import { InputType } from '@nestjs/graphql';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class DeleteProductImageInput {
  @StringValidator()
  productImageId: string;
}
