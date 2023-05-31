import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { MessagesResolver } from './messages.resolver';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { UserRespository } from 'src/users/users.repository';
import { TypeOrmExModule } from 'src/repositories/custom-repository.module';
import { RoomsRepository } from './roomsRepository';
import { AuctionRepository } from 'src/auctions/auctions.repository';
import { Auction } from 'src/auctions/entities/auctions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Room, User, Auction]),
    TypeOrmExModule.forCustomRepository([UserRespository]),
  ],
  providers: [
    MessagesService,
    MessagesRepository,
    MessagesResolver,
    UserService,
    UserRespository,
    RoomsRepository,
    AuctionRepository,
  ],
  exports: [RoomsRepository],
})
export class MessagesModule {}
