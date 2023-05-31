import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';

export enum MessageType {
  Common = 'Common',
  Bid = 'Bid',
  Candidate = 'Candidate',
}

registerEnumType(MessageType, { name: 'MessageType' });

@InputType('MessageInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Message extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  text: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.messages)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  @IsNumber()
  userId: number;

  @Field((type) => Room)
  @ManyToOne((type) => Room, (room) => room.messages, { cascade: true })
  @JoinColumn({ name: 'roomId' })
  room: Room;
  @Column()
  @IsNumber()
  roomId: number;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.Common })
  @Field((type) => MessageType)
  @IsEnum(MessageType)
  type: MessageType;
}
