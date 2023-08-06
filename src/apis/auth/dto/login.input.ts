import { InputType } from '@nestjs/graphql';
import { StringValidator } from 'src/commons/decorators/validate.decorator';

@InputType()
export class LoginInput {
  @StringValidator()
  email: string;

  @StringValidator()
  password: string;
}
