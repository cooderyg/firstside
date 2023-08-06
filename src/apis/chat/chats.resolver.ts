import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation, Query } from '@nestjs/graphql';
import { ChatMessage } from './entities/chatMessage.entity';
import { IContext } from 'src/commons/interfaces/context';
import { ChatRoom } from './entities/chatRoom.entity';

@Injectable()
export class ChatsResolver {
  @Query(() => [ChatMessage])
  fetchChatMessages(
    @Context() context: IContext, //
  ) {
    const user = context.req.user;
  }

  //   @Mutation(() => ChatRoom)
  //   createChatRoom(@Args('createChatRoomInput') createChatRoomInput) {}
}
