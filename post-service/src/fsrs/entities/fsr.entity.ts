import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Fsr {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
