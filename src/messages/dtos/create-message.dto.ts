import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateMessageInput extends PickType(Message, ['text', 'type']) {
  @Field((type) => Number)
  roomId: number;
}

@ObjectType()
export class createMessageOutput extends CoreOutput {
  // @Field()
  // messages?: IMessage;
}

// export interface IMessage {
//   id: number;
//   text: string;
//   user: {
//     id: number;
//     email: string;
//     nickname: string;
//   };
//   type: string;
//   room: {
//     id: number;
//   };
//   createdAt: Date;
// }
