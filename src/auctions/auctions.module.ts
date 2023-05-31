import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from './auctions.repository';
import { AuctionResolver } from './auctions.resolver';
import { AuctionService } from './auctions.service';
import { Auction } from './entities/auctions.entity';
import { UserService } from 'src/users/users.service';
import { UserRespository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { AuctionsController } from './auctions.controller';
import { TypeOrmExModule } from 'src/repositories/custom-repository.module';
import { RoomsRepository } from 'src/messages/roomsRepository';
import { Room } from 'src/messages/entities/room.entity';

@Module({
  controllers: [AuctionsController],
  imports: [TypeOrmModule.forFeature([Auction, Room, User])],
  providers: [
    AuctionResolver,
    AuctionService,
    AuctionRepository,
    UserService,
    UserRespository,
    RoomsRepository,
  ],
  exports: [AuctionRepository],
})
export class AuctionsModule {}
