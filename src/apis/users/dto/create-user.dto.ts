import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class CreateUserInput extends PickType(User, ['email', 'password', 'nickname']) {
  @IsNumber()
  @Min(1)
  @Max(120)
  @Field(() => Int)
  age: number;
}
