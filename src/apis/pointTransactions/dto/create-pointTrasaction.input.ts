import { InputType } from '@nestjs/graphql';
import { NumberValidator, StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class CreatePointTransactionInput {
  @StringValidator()
  impUid: string;

  @NumberValidator()
  amount: number;
}
