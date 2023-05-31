import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuctionService } from './auctions.service';
import {
  CreateAuctionInput,
  CreateAuctionOutput,
} from './dtos/create-auction.dto';
import {
  UpdateAuctionInput,
  UpdateAuctionOutput,
} from './dtos/update-auction.dto';
import { Auction } from './entities/auctions.entity';
import { PubSub } from 'graphql-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PUB_SUB } from 'src/common/common.constants';
import { ShowAuctionsOutput } from './dtos/show-auctions.dto';
import { ShowAuctionInput, ShowAuctionOutput } from './dtos/show-auction.dto';
import { DecideBuyerInput, DecideBuyerOutput } from './dtos/decide-buyer.dto';

@Resolver()
export class AuctionResolver {
  constructor(private readonly auctionService: AuctionService) {}

  @Query(() => ShowAuctionsOutput)
  getAuctions(): Promise<ShowAuctionsOutput> {
    return this.auctionService.getAllAuctions();
  }

  @Query(() => ShowAuctionOutput)
  getAuction(
    @Args('input') { roomId }: ShowAuctionInput,
  ): Promise<ShowAuctionOutput> {
    return this.auctionService.getAuction(roomId);
  }

  @Mutation((returns) => CreateAuctionOutput)
  @UseGuards(AuthGuard)
  async createAuction(
    @AuthUser() authUser: User,
    @Args('input') createAuctionInput: CreateAuctionInput,
  ): Promise<CreateAuctionOutput> {
    // const authUser = 1;
    console.log(authUser['id']);
    return await this.auctionService.createAuction(
      authUser['id'],
      createAuctionInput,
    );
  }

  @Mutation(() => DecideBuyerOutput)
  @UseGuards(AuthGuard)
  async decideBuyer(
    @AuthUser() authUser: User,
    @Args('input') decideBuyerInput: DecideBuyerInput,
  ): Promise<DecideBuyerOutput> {
    return await this.auctionService.decideBuyer(
      decideBuyerInput,
      authUser['id'],
    );
  }

  @Mutation((returns) => Boolean)
  async updateAuction(
    @Args('input') updateAuctionInput: UpdateAuctionInput,
  ): Promise<UpdateAuctionOutput> {
    return await this.auctionService.updateAuction(updateAuctionInput);
  }
}
