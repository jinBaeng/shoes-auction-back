import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateCandidateInput {
  @Field(() => Number)
  messageId: number;

  @Field(() => Number)
  roomId: number;
}

@ObjectType()
export class UpdateCandidateOutput extends CoreOutput {}
