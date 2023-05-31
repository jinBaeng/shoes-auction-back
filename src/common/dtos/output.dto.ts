import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field((type) => Boolean)
  ok: boolean;

  @Field((type) => String)
  message?: string;
}
