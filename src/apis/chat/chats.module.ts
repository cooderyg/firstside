import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  providers: [
    ChatsService, //
    ChatsResolver,
  ],
})
export class ChatsModule {}
