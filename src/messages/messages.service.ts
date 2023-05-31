import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dtos/create-message.dto';
import { PUB_SUB } from 'src/common/common.constants';
import { PubSub } from 'graphql-subscriptions';
import { MessagesRepository } from './messages.repository';
import { UserRespository } from 'src/users/users.repository';
import { AuctionRepository } from 'src/auctions/auctions.repository';
import { create } from 'domain';
import { MessageType } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private messageRepository: MessagesRepository,
    private userRepository: UserRespository,
    private auctionRepository: AuctionRepository,
  ) {}

  async getMessages(room) {
    const messages = await this.messageRepository.showMessages(room);
    if (messages[0] == null) {
      return {
        ok: false,
        message: '메세지가 없습ㄴ디ㅏ',
      };
    }

    return { ok: true, messages: messages };
  }

  async updateCandidate({ messageId, roomId }, userId) {
    try {
      console.log('updateCandidate');
      console.log('messageId', messageId);
      console.log('roomId', roomId);
      const auction = await this.auctionRepository.getAuctionByroomId(roomId);
      if (auction.userId != userId) {
        return {
          ok: false,
          message: 'you cannot update this message',
        };
      }
      const previousCandidate =
        await this.messageRepository.showCandidateMessage(roomId);

      if (previousCandidate) {
        const updatePreviousToCommon =
          await this.messageRepository.updateMessage(previousCandidate.id, {
            type: MessageType.Bid,
          });
        console.log(updatePreviousToCommon);
      }

      const newCandidate = await this.messageRepository.updateMessage(
        messageId,
        {
          type: MessageType.Candidate,
        },
      );
      console.log(newCandidate);

      return {
        ok: true,
        messaege: 'success to update candidate',
      };
    } catch (error) {
      console.log(error);

      return {
        ok: false,
        messaege: 'failed to update candidate',
      };
    }
  }

  async createMessage(createMessageInput: CreateMessageInput, user) {
    try {
      const auction = await this.auctionRepository.getAuctionByroomId(
        createMessageInput.roomId,
      );

      if (
        auction.buyerId &&
        auction.buyerId !== user &&
        auction.buyerId &&
        auction.userId !== user
      ) {
        return { ok: false, message: 'this auction is over' };
      }

      const message = await this.messageRepository.createMessage(
        createMessageInput,
        user,
      );
      const messageUser = await this.userRepository.getUserById(message.user);

      const newMessage = {
        id: message.id,
        text: message.text,
        user: {
          id: message.userId,
          email: messageUser.email,
          nickname: messageUser.nickname,
        },
        type: message.type,
        room: { id: message.roomId },
        createdAt: message.createdAt,
      };
      this.pubSub.publish('messageCreated', { messageCreated: newMessage });

      return { ok: true, message: 'create message' };
    } catch (error) {
      return { ok: false, message: 'failed to create message' };
    }
  }
  async messageCreated() {
    return this.pubSub.asyncIterator('messageCreated');
  }
}
