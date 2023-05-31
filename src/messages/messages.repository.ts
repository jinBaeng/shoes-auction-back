import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageType } from './entities/message.entity';
import { CreateMessageInput } from './dtos/create-message.dto';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createMessage({ text, roomId, type }: CreateMessageInput, user) {
    const newMessage = await this.messageRepository.save(
      await this.messageRepository.create({
        text,
        roomId,
        type,
        userId: user,
      }),
    );
    return newMessage;
  }

  async showMessages(room) {
    const messages = await this.messageRepository.find({
      where: {
        room,
      },
      relations: {
        user: true,
      },
    });
    return messages;
  }

  async showCandidateMessage(roomId) {
    const message = await this.messageRepository.findOne({
      where: {
        room: roomId,
        type: MessageType.Candidate,
      },
    });
    return message;
  }

  async updateMessage(id, updateItem) {
    const updateMessage = await this.messageRepository.update(id, {
      ...updateItem,
    });
    return updateMessage;
  }
}
