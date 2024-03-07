import { CreateFsrInput } from './create-fsr.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFsrInput extends PartialType(CreateFsrInput) {
  @Field(() => Int)
  id: number;
}
