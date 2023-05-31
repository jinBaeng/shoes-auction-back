import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Room } from '../entities/room.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Message } from '../entities/message.entity';

@InputType()
export class ShowMessagesInput extends PickType(Room, ['id']) {}

@ObjectType()
export class ShowMessagesOutput extends CoreOutput {
  @Field(() => [Message])
  messages?: Message[];
}
