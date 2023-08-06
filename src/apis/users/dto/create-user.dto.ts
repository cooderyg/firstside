import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { StringValidator } from 'src/commons/decorators/validate.decorator';
import { ROLE } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @StringValidator()
  email: string;

  @StringValidator()
  password: string;

  @StringValidator()
  nickname: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  @Field(() => Int)
  age: number;

  @IsEnum(ROLE)
  @Field(() => ROLE)
  role: ROLE;
}

// extends PickType(User, ['email', 'password', 'nickname'])
