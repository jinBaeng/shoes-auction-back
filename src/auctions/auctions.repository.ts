import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Auction } from './entities/auctions.entity';

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,
  ) {}

  async getAll(): Promise<Auction[]> {
    return await this.auctionRepository.find({
      where: {
        buyer: IsNull(),
      },
      relations: {
        user: true,
        room: true,
      },
    });
  }

  async getAuctionByroomId(roomId) {
    console.log(roomId);
    return await this.auctionRepository.findOne({
      where: { roomId },
      relations: {
        user: true,
        buyer: true,
      },
    });
  }

  async createAuction(createAuctionInput): Promise<Auction[]> {
    const newRestaurant = this.auctionRepository.save(
      await this.auctionRepository.create(createAuctionInput),
    );
    return newRestaurant;
  }

  async updateAuction(id, data) {
    return await this.auctionRepository.update(id, { ...data });
  }
}
