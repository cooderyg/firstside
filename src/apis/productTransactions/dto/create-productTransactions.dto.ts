import { InputType, PickType } from '@nestjs/graphql';
import { ProductTransaction } from '../entities/productTransaction.entity';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class CreateProductTransactionInput extends PickType(ProductTransaction, [
  'amount',
  'pointAmount',
  'productInfos',
]) {
  @StringValidator()
  storeId: string;

  @StringValidator()
  impUid?: string;
}
