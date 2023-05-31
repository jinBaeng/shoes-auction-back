import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Auction } from 'src/auctions/entities/auctions.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Message } from './message.entity';

@InputType('RoomInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Room extends CoreEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.rooms)
  host: User;

  @Field((type) => Auction, { nullable: true })
  @JoinColumn()
  @OneToOne((type) => Auction, (auction) => auction.room)
  auction: Auction;

  @Field((type) => [Message])
  @OneToMany((type) => Message, (message) => message.room)
  messages: Message[];
}
