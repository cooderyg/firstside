import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'nickname',
  'age',
]) {}
// @IsString()
// @IsNotEmpty()
// @Field(() => String)
// email: string;
// @IsString()
// @IsNotEmpty()
// @Field(() => String)
// password: string;
// @IsString()
// @IsNotEmpty()
// @Field(() => String)
// name: string;
// @IsNumber()
// @Min(1)
// @Max(120)
// @Field(() => Int)
// age: number;
