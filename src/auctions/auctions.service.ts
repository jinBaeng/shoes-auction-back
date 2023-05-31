import { Injectable } from '@nestjs/common';
import { AuctionRepository } from '../auctions/auctions.repository';
import {
  CreateAuctionInput,
  CreateAuctionOutput,
} from '../auctions/dtos/create-auction.dto';
import { UpdateAuctionInput } from '../auctions/dtos/update-auction.dto';
import path from 'path';
import fs from 'fs';
import { RoomsRepository } from 'src/messages/roomsRepository';

@Injectable()
export class AuctionService {
  constructor(
    private auctionRepository: AuctionRepository,
    private roomsRepository: RoomsRepository,
  ) {}
  async getAllAuctions() {
    try {
      const auctions = await this.auctionRepository.getAll();
      return {
        ok: true,
        auctions,
      };
    } catch (error) {
      return {
        ok: false,
        message: '',
      };
    }
  }

  async getAuction(roomId) {
    try {
      const auction = await this.auctionRepository.getAuctionByroomId(roomId);
      if (!auction) {
        return {
          ok: false,
          message: 'cannot find to auction',
        };
      }
      return {
        ok: true,
        auction,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'failed to show auction',
      };
    }
  }

  async createAuction(
    authuser,
    createAuctionInput: CreateAuctionInput,
  ): Promise<CreateAuctionOutput> {
    try {
      const auction = await this.auctionRepository.createAuction({
        ...createAuctionInput,
        userId: authuser,
      });
      const room = await this.roomsRepository.createRoom(
        authuser,
        auction['id'],
      );
      const updatedAuction = await this.auctionRepository.updateAuction(
        auction['id'],
        {
          roomId: room['id'],
        },
      );
      return { ok: true, auctionId: auction['id'], message: 'create auction' };
    } catch (error) {
      return {
        ok: false,
        message: 'could not create auction',
      };
    }
  }

  async decideBuyer({ roomId, buyerId }, userId) {
    try {
      console.log(roomId, buyerId, userId);
      const auction = await this.auctionRepository.getAuctionByroomId(roomId);
      if (auction.userId != userId)
        return {
          ok: false,
          message: 'you cant to decide buyer',
        };

      const updatedAuction = await this.auctionRepository.updateAuction(
        auction.id,
        { buyerId },
      );
    } catch (error) {
      return {
        ok: false,
        message: 'failed to decide buyer',
      };
    }
  }

  async uploadFile(file, auctionId) {
    const ext = path.extname(file.originalname);
    const url = `${path.basename(file.originalname, ext) + Date.now() + ext}`;
    url.replace(/:/g, '-');
    fs.writeFileSync(`public/img/${url}`, file.buffer);
    console.log(url);
    const updateAuctoinImg = await this.auctionRepository.updateAuction(
      auctionId,
      {
        img: `http://localhost:8000/public/img/${url}`,
      },
    );
  }

  updateAuction({ id, data }: UpdateAuctionInput) {
    try {
      const updatedAuction = this.auctionRepository.updateAuction(id, data);
      return {
        ok: true,
        message: 'success to update auction',
      };
    } catch (error) {
      return {
        ok: false,
        message: error,
      };
    }
  }
}
