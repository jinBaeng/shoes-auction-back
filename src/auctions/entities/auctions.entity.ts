import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { type } from 'os';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/messages/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@InputType('AuctionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Auction extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @Column({ nullable: true })
  @IsString()
  content?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @Column({ nullable: true })
  @IsString()
  img: string;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.buyAuctions)
  @JoinColumn({ name: 'buyerId' })
  buyer?: User;
  @Column({ nullable: true })
  @IsNumber()
  buyerId?: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.auctions)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  @IsNumber()
  userId: number;

  @Field((type) => Room, { nullable: true })
  @OneToOne((type) => Room, (room) => room.auction, { cascade: true })
  @JoinColumn({ name: 'roomId' })
  room: Room;
  @Column({ nullable: true })
  @IsNumber()
  roomId: number;
}
