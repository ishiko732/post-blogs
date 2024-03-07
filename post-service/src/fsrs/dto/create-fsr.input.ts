import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFsrInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
