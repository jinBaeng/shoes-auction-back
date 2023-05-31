import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Auction } from 'src/auctions/entities/auctions.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/messages/entities/room.entity';

@ObjectType({ isAbstract: true })
@InputType('UserInputType', { isAbstract: true })
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ unique: true })
  @Field((type) => String)
  nickname: string;

  @Column({ nullable: true })
  @Field((type) => String)
  @IsOptional()
  refreshToken: string;

  @Field((type) => [Auction])
  @OneToMany((type) => Auction, (auction) => auction.buyer)
  buyAuctions: Auction[];

  @Field((type) => [Auction])
  @OneToMany((type) => Auction, (auction) => auction.user)
  auctions: Auction[];

  @Field((type) => [Message])
  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @Field((type) => [Room])
  @OneToMany((type) => Room, (room) => room.host)
  rooms: Room[];
}
