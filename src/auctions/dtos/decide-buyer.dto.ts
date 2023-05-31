import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DecideBuyerInput {
  @Field((type) => Number)
  roomId: number;

  @Field(() => Number)
  buyerId: number;
}

@ObjectType()
export class DecideBuyerOutput extends CoreOutput {}
