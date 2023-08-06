import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';

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
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  wsClients = [];

  @SubscribeMessage('message')
  connectUser(
    @MessageBody() data: string, //
  ) {
    // const [email, productId] = data;
    this.server.emit('message');
  }

  @SubscribeMessage('send')
  async sendMessage(
    @MessageBody() data: string, //
  ) {
    // const [room, message] = data;
    // 이곳에 채팅 메세지 레포 만든 후 저장하기 //
    // this.server.emit(room, [message]);
  }
}
