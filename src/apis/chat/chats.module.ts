import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ChatsGateway, //
    ChatsService,
    ChatsResolver,
    ChatsModule,
  ],
})
export class ChatsModule {}
