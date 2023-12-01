import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);
    this.server.emit('newMessage', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(
    client: Socket,
    payload: { id: number; messageType: 'sent' | 'received' },
  ) {
    const { id, messageType } = payload;
    const messages = this.messagesService.findAllMessages(id, messageType);
    return messages;
  }
}
