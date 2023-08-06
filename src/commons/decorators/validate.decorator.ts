import { applyDecorators } from '@nestjs/common';
import { Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const StringValidator = () => {
  return applyDecorators(
    IsString(),
    IsNotEmpty(),
    Field(() => String),
  );
};

export const NumberValidator = () => {
  return applyDecorators(
    IsNumber(),
    IsNotEmpty(),
    Field(() => Int),
  );
};
