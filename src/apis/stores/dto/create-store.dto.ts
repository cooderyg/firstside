import { InputType, PickType } from '@nestjs/graphql';
import { Store } from '../entities/store.entity';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class CreateStoreInput {
  @StringValidator()
  name: string;
}
