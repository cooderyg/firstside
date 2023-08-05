import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [
      true, //
      'http://localhost:3000',
      'http://localhost:5500',
    ],
  },
})
@Injectable()
export class ChatsGateway {
  constructor(
    private readonly userRepository: Repository<User>, //
  ) {}
  @WebSocketServer()
  server: Server;

  wsClients = [];

  @SubscribeMessage('message')
  connectUser(
    @MessageBody() data: string, //
  ) {
    const [email, room] = data;
    const receive = `${email}님이 입장했습니다.`;
    this.server.emit('receive' + room, receive);
  }

  @SubscribeMessage('send')
  async sendMessage(
    @MessageBody() data: string, //
  ) {
    const [room, email, message] = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    // 이곳에 채팅 메세지 레포 만든 후 저장하기 //

    this.server.emit(room, [email, message]);
  }
}
