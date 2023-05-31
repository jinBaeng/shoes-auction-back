import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Message } from './entities/message.entity';
import {
  CreateMessageInput,
  createMessageOutput,
} from './dtos/create-message.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ShowMessagesInput, ShowMessagesOutput } from './dtos/show-message.dto';
import {
  UpdateCandidateInput,
  UpdateCandidateOutput,
} from './dtos/update-candidate.dto';

@Resolver()
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Query(() => ShowMessagesOutput)
  async getMessages(
    @Args('input') showMessagesInput: ShowMessagesInput,
  ): Promise<ShowMessagesOutput> {
    console.log(showMessagesInput);
    return this.messagesService.getMessages(showMessagesInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => createMessageOutput)
  async createMessage(
    @Args('input') createMessageInput: CreateMessageInput,
    @AuthUser() user: User,
  ): Promise<createMessageOutput> {
    return this.messagesService.createMessage(createMessageInput, user['id']);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UpdateCandidateOutput)
  async updateCandidate(
    @Args('input') updateCandidateInput: UpdateCandidateInput,
    @AuthUser() user: User,
  ): Promise<UpdateCandidateOutput> {
    console.log('llllllkkkkk');
    return this.messagesService.updateCandidate(
      updateCandidateInput,
      user['id'],
    );
  }

  @Subscription(() => Message, {
    filter: ({ messageCreated: { room } }, { roomId }, { context }) => {
      return room.id == roomId;
    },
  })
  messageCreated(@Args('roomId') roomId: string) {
    return this.messagesService.messageCreated();
  }
}
