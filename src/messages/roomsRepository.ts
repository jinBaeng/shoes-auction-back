import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsRepository {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
  ) {}
  async createRoom(hostId, auctionId) {
    const room = await this.roomsRepository.save(
      this.roomsRepository.create({
        host: hostId,
        auction: auctionId,
      }),
    );
    return room;
  }
}
